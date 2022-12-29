import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRtfRoutingModule } from './admin-rtf-routing.module';
import { AdminRtfComponent } from './admin-rtf.component';


@NgModule({
  declarations: [
    AdminRtfComponent
  ],
  imports: [
    CommonModule,
    AdminRtfRoutingModule
  ]
})
export class AdminRtfModule { }
