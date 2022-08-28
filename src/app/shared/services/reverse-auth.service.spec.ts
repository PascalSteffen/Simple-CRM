import { TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

import { ReverseAuthService } from './reverse-auth.service';

describe('ReverseAuthService', () => {
  let service: ReverseAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase), MatSnackBarModule],
      providers: [AngularFirestore]
    });
    service = TestBed.inject(ReverseAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
