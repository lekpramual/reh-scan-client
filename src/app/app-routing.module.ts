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
      // {
      //   path: 'dashboard',
      //   loadChildren: () => import('./reh/dashboard/dashboard.module').then(m => m.DashboardModule)
      // },
      {
        path: 'checkin',
        loadChildren: () => import('./checkin/checkin.module').then(m => m.CheckinModule)
      }
      // {
      //   path: 'blank',
      //   loadChildren: () => import('./reh/blank/blank.module').then(m => m.BlankModule)
      // }
    ]
  },
  // Auth Routes
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        redirectTo: '/register',
        pathMatch: 'full'
      },
      {
        path: 'register',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
