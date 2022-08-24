import { Component, OnInit } from '@angular/core';
import { collection, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent implements OnInit {
  loading = false;
  user: User = new User();
  userId: string;

  constructor(private firestore: Firestore, public dialogRef: MatDialogRef<EditUserDialogComponent>) { }

  ngOnInit(): void {

  }


  async updateUser() {
    this.loading = true;
    const coll = collection(this.firestore, 'users');
    const docRef = doc(coll, this.userId);
    await updateDoc(docRef, { user: this.user.toJSON() }).then(() => {
      this.loading = false;
      this.dialogRef.close();
    });
  }
}
