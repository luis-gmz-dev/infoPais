import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
	selector: 'app-por-region',
	templateUrl: './por-region.component.html',
	styles: [],
})
export class PorRegionComponent implements OnInit {
	regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
	regionActived: string = '';
	paises: Country[] = [];
	isLoading = false;
	isErrorAlert = false;

	constructor(private _servicePais: PaisService) {}

	ngOnInit(): void {}

	activarRegion(region: string) {
		if (region === this.regionActived) {
			return;
		}

		this.paises = [];
		this.regionActived = region;
		this.isLoading = true;
		this.isErrorAlert = false;
		this._servicePais.buscarRegion(region).subscribe(
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
}
