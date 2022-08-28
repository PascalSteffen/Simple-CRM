import { Injectable, NgZone } from '@angular/core';
import { CurrentUser } from '../services/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  passwordChangeSide = false;
  userData: any; // Save logged in user data
  constructor(public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone,
    private _snackBar: MatSnackBar) {


    /**
     * Saving user data in localstorage when 
     * logged in and setting up null when logged out
     */
    this.afAuth.authState.subscribe((CurrentUser) => {
      if (CurrentUser) {
        this.userData = CurrentUser;
        localStorage.setItem('CurrentUser', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('CurrentUser')!);
      } else {
        localStorage.setItem('CurrentUser', 'null');
        JSON.parse(localStorage.getItem('CurrentUser')!);
      }
    });
  } // NgZone service to remove outside scope warning


  /**
   * sign in with email and password
   * @param email 
   * @param password 
   * @returns 
   * 
   */
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            // window.location.href="/dasboard";
            this.router.navigate(['dashboard']);
            location.reload();
          }
        });
      })
      .catch((error) => {
        this.alert('Email or password are incorrect. Or too many login failures. Please try again later or change your password.', 6000)
        setTimeout(() => {
          console.clear();
        }, 0.1);

      });

  }


  /**
   * password reset, send an Email to the User-Account.
   * @param passwordResetEmail 
   * @returns 
   * 
   */
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.alert('Password reset email sent, check your inbox.', 3000)
      })
    /* .catch((error) => {
      window.alert(error);
    }); */
  }


  /**
   * Returns true when user is looged in and email is verified
   * 
   */
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('CurrentUser')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }


  /**
   * Auth logic to run auth providers
   * @param provider 
   * @returns 
   * 
   */
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['dashboard']);
        // window.location.href="/dasboard";
        this.SetUserData(result.user);

      })
    /* .catch((error) => {
      window.alert(error);
    }); */
  }


  /** 
   * Setting up user data when sign in with username/password, 
   * sign up with username/password and sign in with social auth  
   *  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service
   * 
   */
  SetUserData(CurrentUser: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `CurrentUser/${CurrentUser.uid}`
    );
    const userData: CurrentUser = {
      uid: CurrentUser.uid,
      email: CurrentUser.email,
      displayName: CurrentUser.displayName,
      photoURL: CurrentUser.photoURL,
      emailVerified: CurrentUser.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }


  /**
   * logout function
   * @returns 
   * 
   */
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('CurrentUser');
      this.router.navigate(['signin']);
      this.alert('Logout sucessfully', 3000)
    });
  }


  /**
   * alert for user-actions
   * @param message 
   * 
   */
  alert(message: string, time: number) {
    this._snackBar.open(message, '', {
      duration: time
    });
  }

}
