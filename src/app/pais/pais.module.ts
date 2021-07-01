import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PorCapitalComponent } from './pages/por-capital/por-capital.component';
import { PorPaisComponent } from './pages/por-pais/por-pais.component';
import { PorRegionComponent } from './pages/por-region/por-region.component';
import { VerPaisComponent } from './pages/ver-pais/ver-pais.component';
import { PaisTablaComponent } from './components/pais-tabla/pais-tabla.component';
import { PaisInputComponent } from './components/pais-input/pais-input.component';
import { AnidadaComponent } from './pages/anidada/anidada.component';
import { PaisRoutingModule } from './pais-routing.module';

import { FronterasComponent } from './pages/fronteras/fronteras.component';

@NgModule({
	declarations: [
		PorCapitalComponent,
		PorPaisComponent,
		PorRegionComponent,
		VerPaisComponent,
		PaisTablaComponent,
		PaisInputComponent,
		AnidadaComponent,
		FronterasComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		PaisRoutingModule,
	],
	exports: [
		PorCapitalComponent,
		PorPaisComponent,
		PorRegionComponent,
		VerPaisComponent,
	],
})
export class PaisModule {}
