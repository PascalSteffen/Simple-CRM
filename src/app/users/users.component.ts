import { Component, OnInit } from '@angular/core';
import { collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  user = new User();
  users$: Observable<any>;
  allUsers: any

  constructor(public dialog: MatDialog, private firestore: Firestore) { 

  }

  ngOnInit(): void {
    const coll = collection(this.firestore, 'users');
    this.users$ = collectionData(coll, {idField: "userId"});
    this.users$.subscribe((newUser) => {
      this.allUsers = newUser;
      // console.log(this.allUsers);
    })
  }

  openDialog() {
    this.dialog.open(AddUserDialogComponent);
  }

}
