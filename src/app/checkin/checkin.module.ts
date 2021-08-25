import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckinRoutingModule } from './checkin-routing.module';
import { CheckinComponent } from './checkin.component';

import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';


@NgModule({
  declarations: [
    CheckinComponent
  ],
  imports: [
    CommonModule,

    CheckinRoutingModule,
    ButtonModule,
    RippleModule
  ]
})
export class CheckinModule { }
