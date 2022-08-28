import { ComponentFixture, TestBed } from '@angular/core/testing';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SearchFilterPipe } from '../search-filter.pipe';

import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersComponent, SearchFilterPipe],
      imports: [RouterModule.forRoot([]), MatDialogModule, provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideFirestore(() => getFirestore())]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
