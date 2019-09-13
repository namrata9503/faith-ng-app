import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Customer } from '../models/customer';

import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { CustomerService } from '../services/customer.service';
import { AuthenticationService } from '../services/authentication.service';
import { Role } from '../models/role';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  cust: Customer[] = [];
  
  constructor(private userService: UserService,  private router: Router,
    private authenticationService: AuthenticationService,
    private customerService: CustomerService) {}

  ngOnInit() {
      // this.userService.getAll().pipe(first()).subscribe(users => { 
      //     this.users = users; 
      //     console.log("users all",users)
      // });
    //   this.customerService.getAll().pipe(first()).subscribe(cust => { 
    //     this.cust = cust; 
    //     console.log("cust all",cust)
    // });
  
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
