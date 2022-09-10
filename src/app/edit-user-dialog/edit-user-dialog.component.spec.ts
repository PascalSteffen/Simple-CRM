import { ComponentFixture, TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';

import { EditUserDialogComponent } from './edit-user-dialog.component';

describe('EditUserDialogComponent', () => {
  let component: EditUserDialogComponent;
  let fixture: ComponentFixture<EditUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditUserDialogComponent],
      imports: [FormsModule, RouterModule.forRoot([]), MatDialogModule, provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()), AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase), MatSnackBarModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
