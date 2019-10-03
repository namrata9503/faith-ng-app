import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URLSearchParams, RequestOptions } from '@angular/http';
// import custom validator to validate that password and confirm password fields match
// import { MustMatch } from './_helpers/must-match.validator';

import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { CustomerService } from '../services/customer.service';
import { ViewChild, OnDestroy, HostListener, Inject, ElementRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { NotificationService } from '../services/notification.service';
import { User } from '../models/user';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  user: User;
  users: User[] = [];

 // httpOptions;
  userId:string;
  token:string;
  resetForm: FormGroup;
   headers;
  submitted = false;
  loading = false;
  private subscription: Subscription ;

  constructor(private route: ActivatedRoute,private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private notificationService:NotificationService) { }

  ngOnInit() {

    this.subscription = this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.token = params['token'];
    });

    this.resetForm = this.formBuilder.group({
     
      password: ['', Validators.required]
    });
   
  }
   
  options() {
     this.headers = new Headers({
        'content-type': 'application/json'
    });
    const options = new RequestOptions({ headers:this.headers });

    return options;
}

  resetPassword(user:User){
    console.log("RESET PWD");
    console.log("user pwd check...................   " + user.password);
    return this.http.post(`http://localhost:8080/new/${this.userId}/${this.token}`,user.password)
    .pipe(map((res => console.log(res))));



  }
  

  // convenience getter for easy access to form fields
get f() { return this.resetForm.controls; }

newPassword() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.resetForm.invalid) {
    return;
  }

  this.loading = true;
  this.resetPassword(this.resetForm.value)
    .pipe(first())
    .subscribe(
      data => {
        // this.alertService.success('Registration successful', true);
        console.log("In service reset  password" + data);
        // alert(data+"added")
      // this.router.navigate(['/reset']);
       //this.notificationService.add('! Check Your Emails.. To reset the Password, Click on the link..');

      },
      error => {
        // this.alertService.error(error);
        // alert(error);
        this.loading = false;
        console.log(error);

      });

}
ngOnDestroy() {
  this.subscription.unsubscribe();
}
}

