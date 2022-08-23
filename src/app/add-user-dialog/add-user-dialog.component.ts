import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { addDoc } from '@firebase/firestore';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {
  loading = false;
  user = new User();
  birthDate: Date;
  users$: Observable<any>;
  constructor(private firestore: Firestore, public dialogRef: MatDialogRef<AddUserDialogComponent>) {
    const coll = collection(firestore, 'items');
    this.users$ = collectionData(coll, { idField: "usersId" });
  }


  ngOnInit(): void {
  }

  /**
   * save a new User to the DB.
   * 
   */
  saveUser() {
    this.user.birthday = this.birthDate.getTime();
    const coll = collection(this.firestore, 'users');
    addDoc(coll, { user: this.user.toJSON() });
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.dialogRef.close();
    }, 2000);
  }

}


