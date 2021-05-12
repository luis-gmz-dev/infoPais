import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
	selector: 'app-por-capital',
	templateUrl: './por-capital.component.html',
	styles: [],
})
export class PorCapitalComponent implements OnInit {
	public termino = 'Mexico City';
	public isErrorAlert = false;
	public paises: Country[] = [];
	public isLoading: boolean = true;

	constructor(private _servicePais: PaisService) {
		this.buscar(this.termino);
	}

	ngOnInit(): void {}

	public buscar(termino: string): void {
		this.isLoading = true;
		this.termino = termino;
		this.isErrorAlert = false;
		this._servicePais.buscarCapital(this.termino).subscribe(
			(paises) => {
				this.paises = paises;
				this.isLoading = false;
			},
			(err) => {
				this.paises = [];
				this.isErrorAlert = true;
				this.isLoading = false;
			}
		);
		this.isLoading = true;
	}

	public suggestions(event) {
		console.log('No se que envie?');
		console.log(event);
	}
}
