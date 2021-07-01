import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: 'paises',
		loadChildren: () =>
			import('./pais/pais.module').then((m) => m.PaisModule),
	},

	{ path: '**', redirectTo: 'paises/pais' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
