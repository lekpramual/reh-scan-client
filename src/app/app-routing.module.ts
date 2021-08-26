import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [
  // App 
  {
    path: '',
    component: AppComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'checkin',
        pathMatch: 'full'
      },
      {
        path: 'checkin',
        loadChildren: () => import('./checkin/checkin.module').then(m => m.CheckinModule)
      }
    ]
  },

  // Auth Routes
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'register',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
      },
      {
        path: '',
        redirectTo: '/register',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
