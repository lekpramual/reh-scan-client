import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


// Prime NG
import { TableModule } from 'primeng/table';
import { AvatarModule } from 'primeng/avatar'
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';

// Components
import { RegisterComponent } from './register/register.component';
import { RegisterlineComponent } from './registerline/registerline.component';
import { CheckinComponent } from './checkin/checkin.component';
import { ProfileComponent } from './profile/profile.component';
import { ScanlistComponent } from './scanlist/scanlist.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NotsupportComponent } from './notsupport/notsupport.component';

// Service 
import { ProductService } from './service/productservice';
import { CheckoutComponent } from './checkout/checkout.component';
import { ChkComponent } from './chk/chk.component';

import { AgmCoreModule } from '@agm/core'
@NgModule({
  declarations: [
    AppComponent,
    RegisterlineComponent,
    RegisterComponent,
    CheckinComponent,
    ProfileComponent,
    ScanlistComponent,
    FooterComponent,
    NotsupportComponent,
    CheckoutComponent,
    ChkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AvatarModule,
    ButtonModule,
    RippleModule,
    InputMaskModule,
    AutoCompleteModule,
    TableModule,
    MessagesModule,
    MessageModule,
    InputTextModule,
    ProgressSpinnerModule,
    TooltipModule,
    RippleModule,
    ToastModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyB8xNKRrD398KKS2wQ-lkvu5APlfdqZoCU",
      libraries: ['places']
    })
  ],
  providers: [
    {
      provide: LocationStrategy, useClass: PathLocationStrategy
    },
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
