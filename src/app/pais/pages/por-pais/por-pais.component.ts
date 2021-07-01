import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [],
})
export class PorPaisComponent {
  public termino: string = 'Mexico';
  public isErrorAlert: Boolean = false;
  public paises: Country[] = [];
  public paisesSugeridos: Country[] = [];
  public activarSugerencias: boolean = false;
  public isLoading: boolean = true;

  constructor(private _servicePais: PaisService) {
    this.buscar(this.termino);
  }

  public buscar(termino: string): void {
    this.isLoading = true;
    this.termino = termino;
    this.isErrorAlert = false;
    this._servicePais.buscarPais(this.termino).subscribe(
      (paises) => {
        this.paises = paises.slice();
        this.isLoading = false;
      },
      (err) => {
        this.paises = [];
        this.isErrorAlert = true;
        this.isLoading = false;
      }
    );
    this.activarSugerencias = false;
    // setTimeout(() => {

    // }, 300);
  }

  public suggestions(event) {
    this.activarSugerencias = true;
    this.termino = event;
    this._servicePais.buscarPais(event).subscribe(
      (paises) => (this.paisesSugeridos = paises.splice(0, 5)),
      (err) => {
        this.paisesSugeridos = [];
      }
    );
  }
}
