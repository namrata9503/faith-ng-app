import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URLSearchParams } from '@angular/http';
import {
  HttpClientModule,

  HttpParams
} from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
//import { toPromise } from "rxjs/operators";

import * as _ from 'lodash';

import { User } from '../models/user';
import { Admin } from '../models/admin';
import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  urlSearchParams = new URLSearchParams();
  //urlSearchParams.append('email', user.email);

  token:string;
  social: SocialUser;

  user: User;
  users: User[] = [];
  baseUrl: `http://localhost:8080/user/`;

  constructor(private http: HttpClient) { }

  updateForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(),
    username: new FormControl(),
    email: new FormControl(),
    contact: new FormControl(),
    city: new FormControl()
    // role: new FormControl()
    //hireDate: new FormControl(''),
    //isPermanent: new FormControl(false)
  });
  initializeFormGroup() {
    this.updateForm.setValue({
      id: null,
      name: '',
      username: '',
      email: '',
      contact: '',
      city: ''
    });
  }

  getAll() {
    return this.http.get<User[]>(`http://localhost:8080/users`);
  }
  setUser(user) {
    let userId = user.id;
    delete user.id;
    return this.http.post('http://localhost:8080/users/${user.id}', user);
  }
  getRows() {
    return this.http.get<User[]>(`http://localhost:8080/users/rows/count`);
  }

  getById(id: number) {
    return this.http.get<User>(`http://localhost:8080/users/${id}`);
  }


  registerUser(user: User) {
    return this.http.post(`http://localhost:8080/users/register`,user);
  }
  
  socialLogin(userData) {
    const user = new SocialUser();
    user.name = userData.name;
   // user.firstname = userData.firstName;
   // user.lastname = userData.lastName;
   // user.avatar = userData.photoUrl;
    user.provider = userData.provider;
    user.authToken = userData.authToken;
    console.log(user);
    return this.http.post<any>('http://localhost:8080/users/social', user)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  checkEmail(user: User) {
    console.log("POST");
   
    

    console.log("user email check...................   " + user.email);
   

    return this.http.post(`http://localhost:8080/user/${user.email}`,{}).pipe(map((res => console.log(res))));
  }
  
  

  update(user: User) {
    console.log("id   " + user.id);
    return this.http.put(`http://localhost:8080/users/` + user.id, user);
  }

  delete(id: number) {
    return this.http.delete(`http://localhost:8080/users/` + id);
  }



  populateForm(user) {
    // this.updateForm.setValue(_.omit(user,'createDate'));
    console.log("form " + user.username);
    //console.log(username);

    console.log("user " + user);
    this.updateForm.patchValue(user);
    console.log("value  " + this.updateForm.value.id);
    console.log("patch " +
      user.username
    );
  }


}
