import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule, HttpParams } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URLSearchParams, RequestOptions } from '@angular/http';
// import custom validator to validate that password and confirm password fields match
// import { MustMatch } from './_helpers/must-match.validator';

import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { CustomerService } from '../services/customer.service';
import { ViewChild, OnDestroy, HostListener, Inject, ElementRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { NotificationService } from '../services/notification.service';
import { User } from '../models/user';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-reset-passwordd',
  templateUrl: './reset-passwordd.component.html',
  styleUrls: ['./reset-passwordd.component.css']
})
export class ResetPassworddComponent implements OnInit {

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
  matcher = new MyErrorStateMatcher();


  
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

    // this.resetForm = this.formBuilder.group({
     
    //   password: ['', Validators.required],
    //   confirmPassword: ['', Validators.required]

    // });
    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['']
    }, { validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }
  reset( password: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post<any>(`http://localhost:8080/new/${this.userId}/${this.token}`, { password })
      .pipe(map(user => {
       
        console.log(user);
        return user;
      }));
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
  this.reset(this.f.password.value)
    .pipe(first())
    .subscribe(
      data => {
        // this.alertService.success('Registration successful', true);
        console.log("In service reset  password " + data);
        console.log(" reset  password " + this.resetForm.value.password);

        // alert(data+"added")
       this.router.navigate(['/login']);
       //this.notificationService.add('! Check Your Emails.. To reset the Password, Click on the link..');

      },
      error => {
        // this.alertService.error(error);
        // alert(error);
        this.loading = false;
        console.log(error);

      });

}
// ngOnDestroy() {
//   this.subscription.unsubscribe();
// }
}

