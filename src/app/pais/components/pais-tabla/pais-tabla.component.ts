import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-pais-tabla',
  templateUrl: './pais-tabla.component.html',
  styleUrls: ['./pais-tabla.component.css'],
})
export class PaisTablaComponent implements OnInit {
  @Input() isErrorAlert: boolean;
  @Input() paises: Country[];
  @Input() termino: string;

  constructor() {}

  ngOnInit(): void {}
}
