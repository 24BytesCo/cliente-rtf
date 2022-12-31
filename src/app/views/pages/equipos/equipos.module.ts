import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquiposRoutingModule } from './equipos-routing.module';
import { EquiposComponent } from './equipos.component';
import { GestionarComponent } from './gestionar/gestionar.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

// Ngx-dropzone-wrapper
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { NgxMaskModule } from 'ngx-mask';
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};
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
    DropzoneModule,
    RouterModule.forChild(routes),
    NgxMaskModule.forRoot({ validation: true}), // Ngx-mask

  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }, // Ngx-dropzone-wrapper
  ]
})
export class EquiposModule {}
