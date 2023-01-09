import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CasosRoutingModule } from './casos-routing.module';
import { CasosComponent } from './casos.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import { GestionarComponent } from './gestionar/gestionar.component';
import { Routes, RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

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
  declarations: [CasosComponent, NuevoComponent, GestionarComponent],

  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,

    CasosRoutingModule,
    RouterModule.forChild(routes),
  ],
})
export class CasosModule {}
