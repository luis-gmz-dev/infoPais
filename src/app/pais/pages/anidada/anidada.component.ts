import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisService } from '../../services/pais.service';
import {
  CountrySmall,
  CountrySuperSmall,
} from '../../interfaces/pais.interface';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-anidada',
  templateUrl: './anidada.component.html',
  styles: [],
})
export class AnidadaComponent implements OnInit {
  formAnidada: FormGroup = this._formBuilder.group({
    region: ['', [Validators.required]],
    pais: ['', [Validators.required]],
    frontera: ['', [Validators.required]],
  });

  regiones: string[] = [];
  paises: CountrySmall[] = [];
  paisesFrontera: CountrySuperSmall[] = [];
  //**UI */
  isLoading: boolean = false;

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
          this.formAnidada.get('frontera')?.reset('');
          this.paisesFrontera = [];
        }),
        switchMap((code3Alpha) => {
          return this._paisService.buscarBordersCode3Alpha(code3Alpha);
        }),
        switchMap((pais) => {
          return this._paisService.convertirCode3AlphaToName(pais?.borders);
        })
      )
      .subscribe((paisesFrontera) => {
        this.paisesFrontera = paisesFrontera;

        this.isLoading = false;
      });
  }

  public guardar() {}
}
