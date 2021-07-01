import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnidadaComponent } from './pages/anidada/anidada.component';
import { PorCapitalComponent } from './pages/por-capital/por-capital.component';
import { PorPaisComponent } from './pages/por-pais/por-pais.component';
import { PorRegionComponent } from './pages/por-region/por-region.component';
import { VerPaisComponent } from './pages/ver-pais/ver-pais.component';
import { FronterasComponent } from './pages/fronteras/fronteras.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'pais', component: PorPaisComponent },
      { path: 'region', component: PorRegionComponent },
      { path: 'capital', component: PorCapitalComponent },
      { path: 'pais/:codigoPais', component: VerPaisComponent },
      //	{ path: 'anidada', component: AnidadaComponent },
      { path: 'fronteras', component: FronterasComponent },
      { path: '**', redirectTo: '' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaisRoutingModule {}
