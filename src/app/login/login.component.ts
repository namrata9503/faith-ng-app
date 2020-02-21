import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Role } from '../models/role';
import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { AuthenticationService } from '../services/authentication.service';
import { NotificationService } from '../services/notification.service';
import { UserService } from '../services/user.service';

import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } 
from 'angularx-social-login';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   // recaptcha: any[];
    sub:any;
    loginForm: FormGroup;
    loading = false;
    submitted = false;

    returnUrl: string;
    error = '';
    user: SocialUser;

    
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private notificationService:NotificationService,
        private authService: AuthService,
        private userService: UserService,

    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }
    ngOnInit() {

        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
           // recaptcha: ['',Validators.required]
        });
        
        // this.authService.authState.subscribe((user) => {
        //     this.user = user;
        //     console.log(user);
        //   });
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;

         this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    console.log(data)
                    if (data.status == 401) {
                        //alert(data.message)
                        this.loading = false;
                        console.log("401 if", data.message);
                        this.router.navigate([""]);

                    }
                    else
                      //  alert(data.message)

                    console.log("401 else", data.message);
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                   // alert(error.message)
                     this.notificationService.warn("Invalid Data..");
                    this.loading = false;
                    console.log("error login", error.message)
                });


    }

    // resolved(captchaResponse: any[]){
    //     this.recaptcha = captchaResponse;
    //     console.log(this.recaptcha);
    // }
  signInWithGoogle() {
      this.sub = this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((data)=>{
          console.log(data);
          this.user=data;
          return this.router.navigateByUrl("about");
      })
    //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    //   this.authService.authState.subscribe((user) => {

    //     this.userService.socialLogin(user).subscribe((data)=>{
    //         console.log(user);
    //         return this.router.navigateByUrl("about");

    //     });

    //   });
  
  }
  

  signInWithFacebook() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
    .then((data)=>{
        console.log(data);
        this.user=data;
        return this.router.navigateByUrl("about");
    })
  }

  signInWithLinkedIn(){
    this.authService.signIn(LinkedInLoginProvider.PROVIDER_ID)  
        .then((data)=>{
        console.log(data);
        this.user=data;
        return this.router.navigateByUrl("about");
    })
  }

  logout(): void {
    this.authService.signOut();
  }
}

