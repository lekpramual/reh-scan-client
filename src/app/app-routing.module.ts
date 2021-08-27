import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



// import { AppComponent } from './app.component';
// import { AuthGuard } from './guard/auth.guard';
import { RegisterComponent } from './register/register.component';
import { RegisterlineComponent } from './registerline/registerline.component';
import { CheckinComponent } from './checkin/checkin.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  // App 
  {
    path: '',
    component: RegisterlineComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'checkin',
    component: CheckinComponent
  }

  // {
  //   path: '',
  //   component: AppComponent,
  //   canActivate: [AuthGuard],
  //   children: [
  //     {
  //       path: '',
  //       redirectTo: 'register',
  //       pathMatch: 'full'
  //     },
  //     {
  //       path: 'register',
  //       loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
  //     },
  //     {
  //       path: 'checkin',
  //       loadChildren: () => import('./checkin/checkin.module').then(m => m.CheckinModule)
  //     }
  //   ]
  // },
  // Auth Routes
  // {
  //   path: '',
  //   component: AppComponent,
  //   children: [
  //     {
  //       path: '',
  //       redirectTo: '/registerline',
  //       pathMatch: 'full'
  //     },
  //     {
  //       path: 'registerline',
  //       loadChildren: () => import('./registerline/registerline.module').then(m => m.RegisterlineModule)
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
