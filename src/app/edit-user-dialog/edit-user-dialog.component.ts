import { Component, OnInit } from '@angular/core';
import { collection, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss']
})
export class EditUserDialogComponent implements OnInit {
  loading = false;
  user: User = new User();
  userId: string;
  constructor(public authService: AuthService, private route: ActivatedRoute, private firestore: Firestore, public dialogRef: MatDialogRef<EditUserDialogComponent>) {
  }

  ngOnInit() {

  }

  /**
  * update the Userinformation.
  *
  */
  async updateUser() {
    this.loading = true;
    const coll = collection(this.firestore, 'users');
    const docRef = doc(coll, this.userId);
    await updateDoc(docRef, { user: this.user.toJSON() }).then(() => {
      this.loading = false;
      this.dialogRef.close();
      this.authService.alert('User edit successfully.', 3000);
    });
  }
}
