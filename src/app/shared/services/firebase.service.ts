import { Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, getDoc, onSnapshot} from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DeleteUserDialogComponent } from 'src/app/delete-user-dialog/delete-user-dialog.component';
import { User } from 'src/models/user.class';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  user: User = new User();
  users$: Observable<any>;
  allUsers: any
  userId: any;
  constructor(public firestore: Firestore, public dialog: MatDialog) {
    this.loadcompleteData();
  }


  loadcompleteData() {
    const coll = collection(this.firestore, 'users');
    this.users$ = collectionData(coll, { idField: "userId" });
    this.users$.subscribe((newUser) => {
      this.allUsers = newUser;
    })
  }
  

    /**
  * get the current User
  * 
  */
     async getUser(userId) {
      const coll = collection(this.firestore, 'users');
      const docRef = doc(coll, userId);
      const docSnap = await getDoc(docRef)
      this.user = new User(docSnap.data()['user']);
    }
  
  
    /**
     * update the User on Board.
     * 
     */
    updateUser(userId) {
      const coll = collection(this.firestore, 'users');
      if (userId == true) {
        onSnapshot(doc(coll, userId), (doc) => {
          this.user = new User(doc.data()['user'])
        });
      }
  
    }

  /**
 * give the DeleteUserComponent the Id from the current user.
 * @param i 
 */
  deleteUserDialog(i: any) {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent);
    dialogRef.componentInstance.userId = i['userId']; // i['userId'] Copies the object for editing / passes userid into the compenent
  }

}
