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
	public isErrorAlert = true;
	public paises: Country[] = [];
	public paisesSugeridos: Country[] = [];
	public activarSugerencias: boolean = false;
	public isLoading: boolean = true;

	constructor(private _servicePais: PaisService) {}

	ngOnInit(): void {
		this.buscar(this.termino);
	}

	public buscar(termino: string): void {
		this.activarSugerencias = false;
		this.isLoading = true;
		this.termino = termino;
		this.isErrorAlert = true;
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
	}

	public suggestions(event) {
		this.activarSugerencias = true;
		this.termino = event;
		this._servicePais.buscarCapital(event).subscribe(
			(paises) => (this.paisesSugeridos = paises.splice(0, 5)),
			(err) => {
				this.paisesSugeridos = [];
			}
		);
	}
}
