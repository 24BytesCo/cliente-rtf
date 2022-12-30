import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquiposRoutingModule } from './equipos-routing.module';
import { EquiposComponent } from './equipos.component';
import { GestionarComponent } from './gestionar/gestionar.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

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
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    EquiposRoutingModule,
    RouterModule.forChild(routes),
  ],
})
export class EquiposModule {}
