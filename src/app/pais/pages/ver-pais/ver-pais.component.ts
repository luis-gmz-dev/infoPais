import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';

import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
	selector: 'app-ver-pais',
	templateUrl: './ver-pais.component.html',
})
export class VerPaisComponent implements OnInit {
	pais: Country;

	constructor(
		private _activatedRoute: ActivatedRoute,
		private _paisService: PaisService
	) {}

	ngOnInit(): void {
		this._activatedRoute.params
			.pipe(
				switchMap(({ codigoPais }) => {
					return this._paisService.getPaisCode(codigoPais);
				}),
				tap((resp) => console.log(resp))
			)
			.subscribe((pais: Country) => {
				this.pais = pais;
			});
		// //SIN SWITCMAP
		// this._activatedRoute.params.subscribe(({ codigoPais }) => {
		// 	console.log(codigoPais);
		// 	this._paisService.getPaisCode(codigoPais).subscribe((pais) => {
		// 		console.log(pais);
		// 	});
		// });
	}
}
