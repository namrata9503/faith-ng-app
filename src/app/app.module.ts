import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';



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
    MatConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    
    HttpClientModule,
    HttpClientModule,
    RouterModule,

    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgwWowModule,
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
    AuthenticationService
    // provider used to create fake backend
    //fakeBackendProvider
  ],
  bootstrap: [AppComponent],
  entryComponents:[UpdateUserComponent, MatConfirmDialogComponent]


})
export class AppModule { }
