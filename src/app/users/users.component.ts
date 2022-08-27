import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  searchText;
  user = new User();
  users$: Observable<any>;
  allUsers: any
  userId: any;
  constructor(private route: ActivatedRoute, public dialog: MatDialog, private firestore: Firestore) {

  }


  ngOnInit(): void {
    const coll = collection(this.firestore, 'users');
    this.users$ = collectionData(coll, { idField: "userId" });
    this.users$.subscribe((newUser) => {
      this.allUsers = newUser;
    })
  }


  openDialog() {
    this.dialog.open(AddUserDialogComponent);
  }


  /**
   * give the DeleteUserComponent the Id from the current user.
   * @param i 
   */
  deleteUserDialog(i: any) {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent);
    dialogRef.componentInstance.userId = i['userId']; // i['userId'] Copies the object for editing / passes userid into the compenent
  }

}
