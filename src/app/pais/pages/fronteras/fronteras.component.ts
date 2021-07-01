import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisService } from '../../services/pais.service';
import { Country, CountrySmall } from '../../interfaces/pais.interface';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-fronteras',
  templateUrl: './fronteras.component.html',
  styleUrls: ['./fronteras.component.css'],
})
export class FronterasComponent implements OnInit {
  public isErrorAlert: Boolean = false;
  public paises: CountrySmall[] = [];
  public isLoading: Boolean = false;
  public regiones: string[] = [];
  public paisesFrontera: CountrySmall[] = [];
  //**UI */

  formAnidada: FormGroup = this._formBuilder.group({
    region: ['', [Validators.required]],
    pais: ['', [Validators.required]],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _paisService: PaisService
  ) {}

  ngOnInit(): void {
    this.regiones = this._paisService.regiones;
    //**Rellenar paises */
    this.formAnidada
      .get('region')
      ?.valueChanges.pipe(
        tap((_) => {
          this.isLoading = true;
          this.formAnidada.get('pais')?.reset('');
        }),
        switchMap((region) => this._paisService.buscarPaisesPorRegion(region))
      )
      .subscribe((paises) => {
        paises !== null ? (this.paises = paises) : (this.paises = []);
        this.isLoading = false;
      });
    //**Rellenar paises Fronterizos */
    this.formAnidada
      .get('pais')
      ?.valueChanges.pipe(
        tap((_) => {
          this.isLoading = true;
          this.paisesFrontera = [];
        }),
        switchMap((code3Alpha) => {
          return this._paisService.buscarBordersCode3Alpha(code3Alpha);
        }),
        switchMap((pais) => {
          return this._paisService.obtenerInfoPaisCode3Alpha(pais?.borders);
        })
      )
      .subscribe((paisesFrontera) => {
        this.paisesFrontera = paisesFrontera;

        this.isLoading = false;
      });
  }

  public guardar() {}
}
