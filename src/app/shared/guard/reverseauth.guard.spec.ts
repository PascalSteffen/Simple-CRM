import { TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

import { ReverseauthGuard } from './reverseauth.guard';

describe('ReverseauthGuard', () => {
  let guard: ReverseauthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
      AngularFireAuthModule,
      AngularFireModule.initializeApp(environment.firebase), MatSnackBarModule]
    });
    guard = TestBed.inject(ReverseauthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
