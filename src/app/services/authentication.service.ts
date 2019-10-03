import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';

import { User } from '../models/user';

import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } 
from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  private authService: AuthService;
  user: SocialUser;

  public currentUser: Observable<User>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    // this.authService.authState.subscribe((user =>{
    //   this.user = user;
    //   console.log(user);
    // }));
    // this.authService.authState.subscribe((user) => {
    //   this.user = user;
    //   console.log(user);
    // });
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post<any>(`http://localhost:8080/users/authenticate`, { username, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  
 logout() {
    //  this.authService.authState.subscribe((user =>{
    //   this.user = user;
    //   console.log(user);
    // }));
  // this.authService.signOut();
    localStorage.removeItem('currentUser');
     this.currentUserSubject.next(null);
  }
  

  // logout() {
  //   // remove user from local storage to log user out
  //   localStorage.removeItem('currentUser');
  //   this.currentUserSubject.next(null);
  // }

}

