import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

//interface De Pais
import { Country, Region } from '../interfaces/pais.interface';

@Injectable({
	providedIn: 'root',
})
export class PaisService {
	private apiURL: string = 'https://restcountries.eu/rest/v2';

	get httpParams() {
		return new HttpParams().set(
			'fields',
			'name;capital;alpha2Code;flag;population'
		);
	}

	constructor(private _http: HttpClient) {}

	public buscarPais(nombrePais: string): Observable<Country[]> {
		const url = `${this.apiURL}/name/${nombrePais}`;
		return this._http.get<Country[]>(url, { params: this.httpParams });
	}

	public buscarCapital(nombreCapital: string): Observable<Country[]> {
		const url = `${this.apiURL}/capital/${nombreCapital}`;
		return this._http.get<Country[]>(url, { params: this.httpParams });
	}

	public buscarRegion(region: string): Observable<Country[]> {
		const url = `${this.apiURL}/region/${region}`;
		return this._http.get<Country[]>(url, { params: this.httpParams });
	}

	public getPaisCode(code: string): Observable<Country> {
		const url = `${this.apiURL}/alpha/${code}`;
		return this._http.get<Country>(url);
	}
}
