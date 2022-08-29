import { Component, OnInit } from '@angular/core';
import { collection, deleteDoc, doc, Firestore, getDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/user.class';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss']
})
export class DeleteUserDialogComponent implements OnInit {
  user = new User();
  userId: any;
  loading = false;
  constructor(public authService: AuthService, public router: Router, private route: ActivatedRoute, private firestore: Firestore, public dialogRef: MatDialogRef<DeleteUserDialogComponent>) { }

  ngOnInit(): void {
  }


  /**
  * delete the current user.
  * 
  */
  async deleteUser() {
    this.loading = true;
    const coll = collection(this.firestore, 'users');
    const docRef = doc(coll, this.userId);
    await deleteDoc(docRef).then(() => {
      this.router.navigate(['users']);
      this.loading = false;
      this.dialogRef.close();
      this.authService.alert('User removed successfully.', 3000);
    });
  }
}

