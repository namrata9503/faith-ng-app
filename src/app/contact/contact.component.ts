import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';
import { Role } from '../models/role';
// import custom validator to validate that password and confirm password fields match
// import { MustMatch } from './_helpers/must-match.validator';

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
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  offerForm: FormGroup;
  currentUser: User;
  users: User[] = [];
  contactForm: FormGroup;
  added = false;
  submitted = false;
  loading = false;


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private custService: CustomerService,
    private authenticationService: AuthenticationService
  ) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  }
  @ViewChild('stickyMenu',{static:false}) menuElement: ElementRef;
  sticky: boolean = false;
  elementPosition: any;

  ngOnInit(): void {


    this.offerForm = this.formBuilder.group({
      phone: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required]

    });

    this.contactForm = this.formBuilder.group({
      uname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      uphone: ['', Validators.required],
      messagee: ['',]
    });
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  // convenience getter for easy access to form fields
  get f() { return this.contactForm.controls; }
  onClick() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.contactForm.invalid) {
      return;
    }

    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));

    this.loading = true;
    this.custService.contactUs(this.contactForm.value)
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


  //offer form

  get o() { return this.offerForm.controls; }


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
