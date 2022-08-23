import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserHeaderDialogComponent } from './edit-user-header-dialog.component';

describe('EditUserHeaderDialogComponent', () => {
  let component: EditUserHeaderDialogComponent;
  let fixture: ComponentFixture<EditUserHeaderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserHeaderDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUserHeaderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
