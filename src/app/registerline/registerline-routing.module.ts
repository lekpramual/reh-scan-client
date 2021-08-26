import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterlineComponent } from './registerline.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterlineComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterlineRoutingModule { }
