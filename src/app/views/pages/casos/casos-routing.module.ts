import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CasosComponent } from './casos.component';

const routes: Routes = [{ path: '', component: CasosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CasosRoutingModule { }
