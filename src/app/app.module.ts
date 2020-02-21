import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
// Import ng-circle-progress
import { NgCircleProgressModule } from 'ng-circle-progress';
import { of } from 'rxjs';
import { NgwWowModule } from 'ngx-wow';
import { IndexComponent } from './index/index.component';
import { WorkComponent } from './work/work.component';
import { FormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


// used to create fake backend
import { fakeBackendProvider } from './helpers/fake.backend';


import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';



import { ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';

// Import your library
import { OwlModule } from 'ngx-owl-carousel';
import { ContactComponent } from './contact/contact.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { OfferComponent } from './offer/offer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { AuthenticationService } from './services/authentication.service';

import { AllUsersComponent } from './admin/all-users/all-users.component';

import { LayoutModule } from '@angular/cdk/layout';

// material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UpdateUserComponent } from './admin/update-user/update-user.component';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPassworddComponent } from './reset-passwordd/reset-passwordd.component';

import { SocialLoginModule } from 'angularx-social-login';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider  } from 'angularx-social-login';
import { RecaptchaModule } from 'ng-recaptcha';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('235151173562-iimm1dtji8km5vosa3bl1u19naa5b4po.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('332565874201101')
  },
  {
    id: LinkedInLoginProvider.PROVIDER_ID,
    provider: new LinkedInLoginProvider("81nb0qhlqe1q0n")
  }
]);

export function provideConfig() {
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    WorkComponent,
    AboutComponent,
    ContactComponent,
    TestimonialsComponent,
    OfferComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    AllUsersComponent,
    UpdateUserComponent,
    MatConfirmDialogComponent,
    ForgotComponent,
    ResetComponent,
    ResetPasswordComponent,
    ResetPassworddComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
     RouterModule,
    SocialLoginModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgwWowModule,
    RecaptchaModule,
    ReactiveFormsModule,
    OwlModule,  // Specify OwlModule as an import

    // Specify ng-circle-progress as an import
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,

    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    
    LayoutModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthenticationService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
    // provider used to create fake backend
    //fakeBackendProvider
  ],
  bootstrap: [AppComponent],
  entryComponents:[UpdateUserComponent, MatConfirmDialogComponent]


})
export class AppModule { }
