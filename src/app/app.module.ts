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
import { HttpClientModule,HttpClient  } from '@angular/common/http'; 


import { ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';

// Import your library
import { OwlModule } from 'ngx-owl-carousel';
import { ContactComponent } from './contact/contact.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { OfferComponent } from './offer/offer.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    WorkComponent,
    AboutComponent,
    ContactComponent,
    TestimonialsComponent,
    OfferComponent
  ],
  imports: [ 
    BrowserModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
