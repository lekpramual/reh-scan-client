import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterlineRoutingModule } from './registerline-routing.module';
import { RegisterlineComponent } from './registerline.component';


@NgModule({
  declarations: [
    RegisterlineComponent
  ],
  imports: [
    CommonModule,
    RegisterlineRoutingModule
  ]
})
export class RegisterlineModule { }
