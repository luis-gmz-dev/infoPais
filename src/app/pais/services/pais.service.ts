import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { combineLatest, Observable, of } from 'rxjs';

//interface De Pais
import {
  Country,
  CountrySmall,
  CountrySuperSmall,
} from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  private apiURL: string = 'https://restcountries.eu/rest/v2';

  private _regiones: string[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];

  get regiones(): string[] {
    return [...this._regiones];
  }

  get httpParams() {
    return new HttpParams().set(
      'fields',
      'name;capital;alpha3Code;flag;population;borders;'
    );
  }
  get httpParamsBorders() {
    return new HttpParams().set('fields', 'name;alpha3Code;borders;');
  }

  constructor(private _http: HttpClient) {}

  public buscarPais(nombrePais: string): Observable<Country[]> {
    const url = `${this.apiURL}/name/${nombrePais}`;
    return this._http.get<Country[]>(url, { params: this.httpParams });
  }
  public buscarPaisesPorRegion(
    nombreRegion: string
  ): Observable<CountrySmall[]> | null {
    if (nombreRegion !== '') {
      const url = `${this.apiURL}/region/${nombreRegion}`;
      return this._http.get<CountrySmall[]>(url, {
        params: this.httpParams,
      });
    }
    return of(null);
  }

  public buscarCapital(nombreCapital: string): Observable<Country[]> {
    const url = `${this.apiURL}/capital/${nombreCapital}`;
    return this._http.get<Country[]>(url, { params: this.httpParams });
  }

  public buscarRegion(region: string): Observable<Country[]> {
    const url = `${this.apiURL}/region/${region}`;
    return this._http.get<Country[]>(url, { params: this.httpParams });
  }

  public buscarPaisCode3Alpha(code3alpha: string): Observable<Country> | null {
    if (code3alpha !== '') {
      const url = `${this.apiURL}/alpha/${code3alpha}`;
      return this._http.get<Country>(url);
    }
    return of(null);
  }
  public buscarPaisSmallCode3Alpha(
    code3alpha: string
  ): Observable<CountrySmall> | null {
    if (code3alpha !== '') {
      const url = `${this.apiURL}/alpha/${code3alpha}`;
      return this._http.get<CountrySmall>(url, {
        params: this.httpParams,
      });
    }
    return of(null);
  }

  public buscarPaisSuperSmallCode3Alpha(
    code3alpha: string
  ): Observable<CountrySuperSmall> | null {
    if (code3alpha !== '') {
      const url = `${this.apiURL}/alpha/${code3alpha}`;
      return this._http.get<CountrySuperSmall>(url, {
        params: this.httpParamsBorders,
      });
    }
    return of(null);
  }

  public buscarBordersCode3Alpha(
    code3alpha: string
  ): Observable<CountrySuperSmall> | null {
    if (code3alpha !== '') {
      const url = `${this.apiURL}/alpha/${code3alpha}`;
      return this._http.get<CountrySuperSmall>(url, {
        params: this.httpParamsBorders,
      });
    }
    return of(null);
  }

  public convertirCode3AlphaToName(
    borders: string[]
  ): Observable<CountrySuperSmall[]> {
    if (borders === undefined || borders.length == 0) {
      return of([
        {
          name: 'Sin pais Fronterizo',
          alpha3Code: 'S/F',
        },
      ]);
    }
    const peticiones: Observable<CountrySuperSmall>[] = [];
    borders.forEach((code3alpha) => {
      const peticion = this.buscarPaisSuperSmallCode3Alpha(code3alpha);
      peticiones.push(peticion);
    });

    return combineLatest(peticiones);
  }

  public obtenerInfoPaisCode3Alpha(
    borders: string[]
  ): Observable<CountrySmall[] | null> {
    if (borders === undefined || borders.length == 0) {
      return of(null);
    }
    const peticiones: Observable<CountrySmall>[] = [];
    borders.forEach((code3alpha) => {
      const peticion = this.buscarPaisSmallCode3Alpha(code3alpha);
      peticiones.push(peticion);
    });

    return combineLatest(peticiones);
  }
}
