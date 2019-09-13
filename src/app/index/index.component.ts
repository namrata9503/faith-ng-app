import { Component, ViewChild, OnInit, OnDestroy, HostListener, Inject, ElementRef } from '@angular/core';
import { map, filter, scan } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';
import { Role } from '../models/role';
import { UserService } from '../services/user.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { first } from 'rxjs/operators';

import { CustomerService } from '../services/customer.service';

import { } from 'googlemaps';

import { } from 'googlemaps';
import { NgwWowService } from 'ngx-wow';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import * as AOS from 'aos';

import { DOCUMENT } from '@angular/common';

import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  animations: [
    trigger('fade',
      [
        state('void', style({ opacity: 0 })),
        transition(':enter', [animate(300)]),
        transition(':leave', [animate(500)]),
      ]
    )]
})
export class IndexComponent implements OnInit {
  currentUser: User;
  users: User[] = [];

  
  offerForm: FormGroup;
  submitted = false;
  loading = false;
  private wowSubscription: Subscription;

  constructor(@Inject(DOCUMENT) document, private router: Router, private wowService: NgwWowService,
    private formBuilder: FormBuilder,
    private custService: CustomerService,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      // Reload WoW animations when done navigating to page,
      // but you are free to call it whenever/wherever you like
      this.wowService.init();
      AOS.init();

    });
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);



  }

  @ViewChild('stickyMenu',{static:true}) menuElement: ElementRef;
  sticky: boolean = false;
  elementPosition: any;
  @ViewChild('map',{static:false}) mapElement: any;
  map: google.maps.Map;
  ngOnInit(): void {



    this.offerForm = this.formBuilder.group({
      phone: ['', Validators.required],

      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required]

    });


    // this.userService.getAllUsers().pipe(first()).subscribe(users => {
    //   this.users = users;
    //   console.log("login users: ", users)
    // });
    const mapProperties = {
      center: new google.maps.LatLng(41.658034, -86.170055),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    // you can subscribe to WOW observable to react when an element is revealed
    this.wowSubscription = this.wowService.itemRevealed$.subscribe(
      (item: HTMLElement) => {
        // do whatever you want with revealed element
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
  newPage() {

    let name = this.offerForm.get('name').value;
    let phone = this.offerForm.get('phone').value;
    let city = this.offerForm.get('city').value;

    let address = this.offerForm.get('address').value;


    if (name !== '' && phone !== '' && city !== '' && address !== '') {
      this.router.navigateByUrl('work');
    }

  }

  ngOnDestroy() {
    // unsubscribe (if necessary) to WOW observable to prevent memory leaks
    if(this.wowSubscription) { this.wowSubscription.unsubscribe(); }


    //this.wowSubscription.unsubscribe();
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
