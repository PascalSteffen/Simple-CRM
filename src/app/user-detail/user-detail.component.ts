import { Component, OnInit, Output } from '@angular/core';
import { Firestore, doc, getDoc, onSnapshot } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { collection } from '@firebase/firestore';
import { User } from 'src/models/user.class';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { EditUserHeaderDialogComponent } from '../edit-user-header-dialog/edit-user-header-dialog.component';
import { FirebaseService } from '../shared/services/firebase.service';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: User = new User();
  userId: any;
  constructor(public firebaseService: FirebaseService, public route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) {

  }


  /**
   * on init get the current User by the ID for the route.
   * 
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe(async (paramMap) => {
      this.userId = paramMap.get('id');
      console.log(this.userId)
      await this.firebaseService.getUser(this.userId);
      this.firebaseService.updateUser(this.userId);
    })
  }





  openAddressDialog() {
    const dialogRef = this.dialog.open(EditUserDialogComponent);
    dialogRef.componentInstance.user = new User(this.user.toJSON()); // new User(this.user.toJSON()); Copies the object for editing / passes user into the compenent
    dialogRef.componentInstance.userId = this.userId; // userId: any; Copies the object for editing / passes userid into the compenent
  }


  openUserHeaderDialog() {
    const dialogRef = this.dialog.open(EditUserHeaderDialogComponent);
    dialogRef.componentInstance.user = new User(this.user.toJSON()); // new User(this.user.toJSON()); Copies the object for editing / passes user into the compenent
    dialogRef.componentInstance.userId = this.userId; // userId: any; Copies the object for editing / passes userid into the compenent
  }

}
