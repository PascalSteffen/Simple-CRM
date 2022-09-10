import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { addDoc } from '@firebase/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../shared/services/auth.service';

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
  constructor(public authService: AuthService, private firestore: Firestore, public dialogRef: MatDialogRef<AddUserDialogComponent>) { }


  ngOnInit(): void {
  }


  /**
  * save a new User to the DB.
  *
  */
  saveUser() {
    this.loading = true;
    this.user.birthday = this.birthDate.getTime();
    const coll = collection(this.firestore, 'users');
    addDoc(coll, { user: this.user.toJSON() }).then(() => {
      this.loading = false;
      this.dialogRef.close();
      this.authService.alert('User added successfully.', 3000)
    });
  }

}


