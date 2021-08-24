import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';

// Prime NG
import { AvatarModule } from 'primeng/avatar'
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AvatarModule,
    ButtonModule,
    InputMaskModule,
    AutoCompleteModule,
  ]
})
export class RegisterModule { }
