import { Component, OnInit } from '@angular/core';
import { collection, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { EditUserDialogComponent } from "../edit-user-dialog/edit-user-dialog.component";

@Component({
  selector: 'app-edit-user-header-dialog',
  templateUrl: './edit-user-header-dialog.component.html',
  styleUrls: ['./edit-user-header-dialog.component.scss']
})

export class EditUserHeaderDialogComponent implements OnInit {
  loading = false;
  user: User = new User();
  userId: string;
  birthDate: Date;
  constructor(private firestore: Firestore, public dialogRef: MatDialogRef<EditUserDialogComponent>) { }


  ngOnInit(): void {
  }


  /**
   * update the Userinformation.
   * 
   */
  async updateUser() {
    this.loading = true;
    this.user.birthday = this.birthDate.getTime();
    const coll = collection(this.firestore, 'users');
    const docRef = doc(coll, this.userId);
    await updateDoc(docRef, { user: this.user.toJSON() }).then(() => {
      this.loading = false;
      this.dialogRef.close();
    });
  }

}
