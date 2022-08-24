import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-edit-user-header-dialog',
  templateUrl: './edit-user-header-dialog.component.html',
  styleUrls: ['./edit-user-header-dialog.component.scss']
})

export class EditUserHeaderDialogComponent implements OnInit {
  loading = false;
  user: User = new User();
  userId: string;
  
  constructor(private firestore: Firestore, public dialogRef: MatDialogRef<EditUserDialogComponent>) { }

  ngOnInit(): void {
  }

  updateUser() {

  }

}
