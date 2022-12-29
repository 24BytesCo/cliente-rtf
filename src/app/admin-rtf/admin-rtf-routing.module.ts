import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRtfComponent } from './admin-rtf.component';

const routes: Routes = [{ path: '', component: AdminRtfComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRtfRoutingModule { }
