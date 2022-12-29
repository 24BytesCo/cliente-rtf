import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquiposRoutingModule } from './equipos-routing.module';
import { EquiposComponent } from './equipos.component';
import { GestionarComponent } from './gestionar/gestionar.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'gestionar',
        pathMatch: 'full',
      },
      {
        path: 'gestionar',
        component: GestionarComponent,
      },
      {
        path: 'nuevo',
        component: NuevoComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [EquiposComponent, GestionarComponent, NuevoComponent],
  imports: [CommonModule, EquiposRoutingModule, RouterModule.forChild(routes)],
})
export class EquiposModule {}
