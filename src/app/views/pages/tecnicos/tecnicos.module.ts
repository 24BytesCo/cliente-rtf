import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TecnicosRoutingModule } from './tecnicos-routing.module';
import { TecnicosComponent } from './tecnicos.component';
import { Routes, RouterModule } from '@angular/router';
import { GestionarComponent } from './gestionar/gestionar.component';
import { NuevoComponent } from './nuevo/nuevo.component';

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
  declarations: [TecnicosComponent, GestionarComponent, NuevoComponent],
  imports: [CommonModule, TecnicosRoutingModule, RouterModule.forChild(routes)],
})
export class TecnicosModule {}
