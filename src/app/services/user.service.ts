import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import * as _ from 'lodash';

import { User } from '../models/user';
import { Admin } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  users: User[] = [];


  constructor(private http: HttpClient) { }

  updateForm: FormGroup = new FormGroup({
    id: new FormControl(null),
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
    return this.http.post(`http://localhost:8080/users/register`, user);
  }
  

  update(user: User) {
    console.log("id   "+user.id);
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
