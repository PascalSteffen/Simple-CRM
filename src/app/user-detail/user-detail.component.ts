import { Component, OnInit } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { collection } from '@firebase/firestore';
import { User } from 'src/models/user.class';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { EditUserHeaderDialogComponent } from '../edit-user-header-dialog/edit-user-header-dialog.component';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user : User = new User();
  userId: any;
  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) { }

  
  /**
   * on init get the current User by the ID for the route.
   * 
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe(async (paramMap) => {
      this.userId = paramMap.get('id');
      await this.getUser();
    })
  }


  /**
   * get the current User
   * 
   */
  async getUser() {
    const coll = collection(this.firestore, 'users');
    const docRef = doc(coll, this.userId);
    const docSnap = await getDoc(docRef);
    this.user = new User(docSnap.data()['user']);
    // console.log(this.user);
  }


  openAddressDialog() {
    const dialogRef = this.dialog.open(EditUserDialogComponent);
    dialogRef.componentInstance.user = new User(this.user.toJSON()); // new User(this.user.toJSON()); Copies the object for editing / passes user into the compenent
    dialogRef.componentInstance.userId = this.userId; // new User(this.user.toJSON()); Copies the object for editing / passes userid into the compenent
  }

  
  openUserHeaderDialog() {
    const dialogRef = this.dialog.open(EditUserHeaderDialogComponent);
    dialogRef.componentInstance.user = new User(this.user.toJSON()); // new User(this.user.toJSON()); Copies the object for editing / passes user into the compenent
    dialogRef.componentInstance.userId = this.userId; // new User(this.user.toJSON()); Copies the object for editing / passes userid into the compenent
  }

}
