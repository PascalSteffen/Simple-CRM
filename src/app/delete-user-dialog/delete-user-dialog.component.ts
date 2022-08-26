import { Component, OnInit } from '@angular/core';
import { collection, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss']
})
export class DeleteUserDialogComponent implements OnInit {
  userId: any;
  loading = false;
  constructor(public router: Router, private route: ActivatedRoute, private firestore: Firestore, public dialogRef: MatDialogRef<DeleteUserDialogComponent>) { }

  ngOnInit(): void {

  }


  async deleteUser() {
    this.loading = true;
    const coll = collection(this.firestore, 'users');
    const docRef = doc(coll, this.userId);
    await deleteDoc(docRef).then(() => {
      this.router.navigate(['users']);
      this.loading = false;
      this.dialogRef.close();
    });
  }
}
