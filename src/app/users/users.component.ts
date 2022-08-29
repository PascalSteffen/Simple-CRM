import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { FirebaseService } from '../shared/services/firebase.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  searchText;

  constructor(public firebaseService: FirebaseService, public dialog: MatDialog) {}


  ngOnInit(): void {

  }


  openDialog() {
    this.dialog.open(AddUserDialogComponent);
  }

}
