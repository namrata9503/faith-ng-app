import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
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
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';
import { Role } from '../models/role';
import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { UserService } from '../services/user.service';
import { trigger, state, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  user: SocialUser;

  

  offerForm: FormGroup;
  submitted = false;
  loading = false;
  constructor(private formBuilder:FormBuilder,
    private router: Router,
    private authService: AuthService,
    private custService: CustomerService,    
    private authenticationService: AuthenticationService
    ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

     }
  @ViewChild('stickyMenu',{static:false}) menuElement: ElementRef;
  sticky: boolean = false;
  elementPosition: any;




  title = 'OwlCarousel2 in Angular7 with Custom Navigation Arrows';

  carouselOptions = {
    margin: 25,
    center:false,
    dots: false,
    autoplayHoverPause: true,
    nav: true,
    navText:['<i class="fas fa-chevron-left"></i>','<i class="fas fa-chevron-right"></i>'],

   // navText: [" http:///Images/left.png", " http:///Images/right.png"],
    navClass: ['owl-prev', 'owl-next'],
    // navText:["<div class='nav-btn prev-slide'></div>","<div class='nav-btn next-slide'></div>"],
    responsiveClass: true,
    autoplay: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 1,
        nav: true
      },
      1000: {
        items: 4,
        nav: true,
        loop: true
      },
      1500: {
        items: 6,
        nav: true,
        loop: true
      }
    }
  }

  images = [

    {
      text: "QUEEN ST, GHOSHIN",
      image: "../assets/images/home3.jpg"
    },
    {
      text: "KENNWOORD DR, ELKHTEE",
      image: "../assets/images/home4.jpg"
    },
    {
      text: "FREEMONT - ST, ELKHTEE",
      image: "../assets/images/main.png"
    },
    {
      text: "BERGEN - ST , SOUTH-BEND",
      image: "../assets/images/home2.jpg"
    },
    {
      text: "JOECY - CT , ELKHTEE",
      image: "../assets/images/home1.jpg"
    },
    {
      text: "DOSTON - ST, ELEKHETKT",
      image: "../assets/img/main1.jpg"
    }
  ]

  ngOnInit() {


    this.offerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
     
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
