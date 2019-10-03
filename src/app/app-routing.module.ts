import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { WorkComponent } from './work/work.component';
import { HomeComponent } from './home/home.component';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { OfferComponent } from './offer/offer.component';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { Role } from './models/role';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { AllUsersComponent } from './admin/all-users/all-users.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPassworddComponent } from './reset-passwordd/reset-passwordd.component';
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
 
  {
    path: 'admin',
    children: [
      {
        path: '',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: {
          roles: [Role.Admin]
        }
      },
     {
        path: 'all-users',
        component: AllUsersComponent
      }
      // {
      //   path: 'back',
      //   component: AllUsersComponent
      // }

    ]

  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forgot',
    component: ForgotComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  // otherwise redirect to home
  //{ path: '**', redirectTo: '' },

  {
    path: '',
    component: IndexComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'reset',
    component: ResetComponent
  },
  {
    path: 'reset/:userId/:token',
    component: ResetPassworddComponent
  },
  {
    path: 'offer',
    component: OfferComponent
  },
  {
    path: 'work',
    component: WorkComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'testimonials',
    component: TestimonialsComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
