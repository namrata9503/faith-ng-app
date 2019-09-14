import { Component, OnInit, Inject } from '@angular/core';
import { first } from 'rxjs/operators';
import { Customer } from '../../models/customer';
import { FormControl, NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { CustomerService } from '../../services/customer.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Role } from '../../models/role';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  users: User[] = [];
  cust: Customer[] = [];


  updateForm: FormGroup;
  submitted = false;
  loading = false;
  constructor(public dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private notificationService: NotificationService,

  ) {
    //this.users = data;
  }

  ngOnInit() {

     this.userService.getAll().subscribe();

    //console.log("all " + all);


    // this.userService.getAll();
    // console.log("all ", this.userService.getAll);

  }
  // resetForm() {
  //   if (this.userService.updateForm)
  //   this.userService.updateForm.reset();
  //   this.userService.user = {
  //     id: "",
  //     username: "",
  //     city: "",
  //     contact: "",
  //     email: ""
  //   }
  // }

  edit() {
    if (this.userService.updateForm.value.id !== "") {
    this.userService.update(this.userService.updateForm.value).subscribe((res) => {
      this.userService.updateForm.reset();
      this.userService.initializeFormGroup();
     this.refreshUserList();
     console.log("response update.. ",res);
     this.dialogRef.close(this.data);
     this.notificationService.success(':: Updated successfully');

    });
  }
}

  refreshUserList() {
    this.userService.getAll().subscribe((res) => {
      this.userService.users = res as User[];
      this.users=res;
      console.log("refresh List: "+res);
    });
  }
 
}
