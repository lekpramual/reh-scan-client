import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckinRoutingModule } from './checkin-routing.module';
import { CheckinComponent } from './checkin.component';


@NgModule({
  declarations: [
    CheckinComponent
  ],
  imports: [
    CommonModule,
    CheckinRoutingModule
  ]
})
export class CheckinModule { }
