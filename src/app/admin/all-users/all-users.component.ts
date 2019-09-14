import { Component, OnInit, ViewChild, Inject, Input } from '@angular/core';
import { first } from 'rxjs/operators';
import { Customer } from '../../models/customer';
import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { CustomerService } from '../../services/customer.service';
import { NotificationService } from '../../services/notification.service';

import { Role } from '../../models/role';
import { Router, NavigationEnd } from '@angular/router';
import { merge } from 'rxjs';

import { UpdateUserComponent } from '../update-user/update-user.component';
import { MatTable, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { Observable, of } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { DialogService } from '../../services/dialog.service';
@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  users: User[];
  cust: Customer[] = [];
  // userss;
  selectedUser;
  submitted = false;
  loading = false;

  dialogConfig: MatDialogConfig;
  //dialogRef: MatDialogRef<UpdateUserComponent>;

  public dataSource = new MatTableDataSource(this.users);
  displayedColumns: string[] = ['name', 'email', 'contact', 'city', 'actions'];

  user;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  searchKey: string;

  constructor(public dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private router: Router,
    private custService: CustomerService,
    private userService: UserService,
    private dialog: MatDialog,
    private dialogService: DialogService,
    private notificationService: NotificationService,


  ) {

  }

  ngOnInit() {

    this.userService.getAll().pipe(first()).subscribe(users => {
      this.users = users;

      this.dataSource = new MatTableDataSource(this.users);


      this.dataSource.sort = this.sort;
      console.log("users all sort ", this.dataSource);
      this.dataSource.paginator = this.paginator;
      console.log("users all paginator ", this.sort);

    });

    this.userService.getRows().pipe(first()).subscribe(users => {
      this.users = users;
      // console.log("users all", users)
    });


  }
  ngAfterViewInit() {

  }

  showInfo(user) {
    this.selectedUser = user;
    console.log(this.selectedUser);
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.dataSource = new MatTableDataSource(this.users);

    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  onEdit(row) {

    const dialogRef = this.dialog.open(UpdateUserComponent, {
      width: '60%',
      data: row
    });
    dialogRef.afterClosed().subscribe(result => {
      this.user = row;
      console.log("After Close: " + result);
      this.userService.getAll().subscribe((res) => {
        this.dataSource.data = res as User[];
        this.users = res;
        console.log("dialog Ref refresh List: " + res);
      });
    });
    this.userService.populateForm(row);



  }


  onDelete(id) {
    this.dialogService.openConfirmDialog('Are you sure to delete this record ?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.userService.delete(id).subscribe((res) => {
            // this.notificationService.warn('! Deleted successfully');
            console.log("deleted..", res);
            
            console.log("After Close: " + res);
            this.userService.getAll().subscribe((res) => {
              this.dataSource.data = res as User[];
              this.users = res;
              console.log("dialog Ref refresh List: " + res);
            });
          });
        }
        this.notificationService.warn('! Deleted successfully');

      });

  }
}
