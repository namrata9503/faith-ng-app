import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Role } from '../models/role';

import { AuthenticationService } from '../services/authentication.service';
import { NotificationService } from '../services/notification.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  forgotForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  constructor(private userService:UserService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService:NotificationService) { }

  ngOnInit() {
    this.forgotForm = this.formBuilder.group({
      email: ['', Validators.required],
  });
  }
// convenience getter for easy access to form fields
get f() { return this.forgotForm.controls; }

onSubmit() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.forgotForm.invalid) {
    return;
  }

  this.loading = true;
  this.userService.checkEmail(this.forgotForm.value)
    .pipe(first())
    .subscribe(
      data => {
        // this.alertService.success('Registration successful', true);
        console.log("In service email" + data);
        // alert(data+"added")
       this.router.navigate(['/reset']);
       //this.notificationService.add('! Check Your Emails.. To reset the Password, Click on the link..');

      },
      error => {
        // this.alertService.error(error);
        // alert(error);
        this.loading = false;
        console.log(error);
        this.notificationService.warn('! No Email Found.......');


      });

}




}
