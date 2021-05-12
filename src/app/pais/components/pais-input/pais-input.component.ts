import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
	selector: 'app-pais-input',
	templateUrl: './pais-input.component.html',
	styleUrls: ['./pais-input.component.css'],
})
export class PaisInputComponent implements OnInit {
	@Input() placeHolder: string = '';

	@Output() onEnter: EventEmitter<string> = new EventEmitter();

	@Output() onDeBounce: EventEmitter<string> = new EventEmitter();

	deBouncer: Subject<string> = new Subject();

	public termino: string = '';

	ngOnInit(): void {
		this.deBouncer.pipe(debounceTime(400)).subscribe((valor) => {
			this.onDeBounce.emit(valor);
		});
	}

	public buscar() {
		this.onEnter.emit(this.termino);
	}

	public keyPress(event: InputEvent) {
		const valueInput = (event.target as HTMLInputElement).value;
		//tambien se puede enviar el this.termino
		this.deBouncer.next(valueInput);
	}
}
