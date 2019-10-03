import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';

// import custom validator to validate that password and confirm password fields match
// import { MustMatch } from './_helpers/must-match.validator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';
import { Role } from '../models/role';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { CustomerService } from '../services/customer.service';

import { ViewChild, OnDestroy, HostListener, Inject, ElementRef } from '@angular/core';
@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  user: SocialUser;

  offerForm: FormGroup;
  submitted = false;
  loading = false;
  constructor(private router: Router, 
    private formBuilder: FormBuilder,
    private custService: CustomerService,
    private authenticationService: AuthenticationService,
    private authService: AuthService

    ) { 
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

    }
  @ViewChild('stickyMenu',{static:false}) menuElement: ElementRef;
  sticky: boolean = false;
  elementPosition: any;
  ngOnInit() {

    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user);
    });

    this.offerForm = this.formBuilder.group({
      phone: ['', Validators.required],

      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required]

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
