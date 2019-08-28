import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { CustomerService } from '../services/customer.service';

import { ViewChild, OnDestroy, HostListener, Inject, ElementRef } from '@angular/core';
import { map, filter, scan } from 'rxjs/operators';
import { } from 'googlemaps';
import { NgwWowService } from 'ngx-wow';
import { Subscription } from 'rxjs';
import { NavigationEnd } from '@angular/router';
import * as AOS from 'aos';

import { DOCUMENT } from '@angular/common';

import { trigger, state, transition, style, animate } from '@angular/animations';
import { Offer } from '../models/offer';
@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {
  offerForm: FormGroup;
  submitted = false;
  loading = false;
  constructor(private formBuilder:FormBuilder,
    private router: Router,
    private custService: CustomerService) { }
    @ViewChild('stickyMenu') menuElement: ElementRef;
    sticky: boolean = false;
    elementPosition: any;

  ngOnInit() {
    this.offerForm = this.formBuilder.group({
      phone: ['', Validators.required],

      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required]
     
});

  }

  
  // convenience getter for easy access to form fields
get f() { return this.offerForm.controls; }

onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.offerForm.invalid) {
        return;
    }

    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));

    this.loading = true;
    this.custService.offerCustAdd(this.offerForm.value)
        .pipe(first())
        .subscribe(
            data => {
              // this.alertService.success('Registration successful', true);
               // this.router.navigate(['/login']);
               alert("suucess data added");
            },
            error => {
                //this.alertService.error(error);
                alert("error");
                this.loading = false;
            });
}

newPage(): void {
 
  let name = this.offerForm.get('name').value;
  let phone = this.offerForm.get('phone').value;
  let city = this.offerForm.get('city').value;

  let address = this.offerForm.get('address').value;


  if (name !== '' && phone !== ''  && city !== '' && address !==''){
    this.router.navigateByUrl('work'); 
   }   
  

}
  ngAfterViewInit() {
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }
  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll >= this.elementPosition) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

}
