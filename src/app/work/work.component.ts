import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// import custom validator to validate that password and confirm password fields match
// import { MustMatch } from './_helpers/must-match.validator';

import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';
import { Role } from '../models/role';
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
import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {
  registerForm: FormGroup;
  offerForm: FormGroup;
  user: SocialUser;

  currentUser: User;
  users: User[] = [];

  submitted = false;
  loading = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
,
    private custService: CustomerService,
    private authenticationService: AuthenticationService
    ) { 
            this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }
  @ViewChild('stickyMenu',{static:false}) menuElement: ElementRef;
  sticky: boolean = false;
  elementPosition: any;

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      bedrooms: ['', Validators.required],
      baths: ['', Validators.required],
      price: ['', Validators.required]
    });
    this.offerForm = this.formBuilder.group({
      phone: ['', Validators.required],

      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required]

    });
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
    });
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  logout() {
    this.authService.signOut();

    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));

    this.loading = true;
    this.custService.register(this.registerForm.value)
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

     // convenience getter for easy access to form fields
get o() { return this.offerForm.controls; }

onOffer() {
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
  newPage() {

    let name = this.offerForm.get('name').value;
    let phone = this.offerForm.get('phone').value;
    let city = this.offerForm.get('city').value;

    let address = this.offerForm.get('address').value;


    if (name !== '' && phone !== '' && city !== '' && address !== '') {
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
