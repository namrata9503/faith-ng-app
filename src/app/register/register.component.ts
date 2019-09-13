import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// import custom validator to validate that password and confirm password fields match
// import { MustMatch } from './_helpers/must-match.validator';

import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { CustomerService } from '../services/customer.service';
import { ViewChild, OnDestroy, HostListener, Inject, ElementRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  submitted = false;
  loading = false;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password:  ['',Validators.required],
      city:  ['',Validators.required],
      contact:  ['',Validators.required],
      role:  ['',Validators.required]
});
  }
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;
    this.userService.registerUser(this.registerForm.value)
        .pipe(first())
        .subscribe(
            data => {
                // this.alertService.success('Registration successful', true);
                console.log("In service " + data);
              // alert(data+"added")
                this.router.navigate(['/login']);
               
            },
            error => {
                // this.alertService.error(error);
               // alert(error);
                this.loading = false;
            });
}

}
