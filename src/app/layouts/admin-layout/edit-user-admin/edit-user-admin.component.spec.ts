import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserAdminComponent } from './edit-user-admin.component';

describe('EditUserAdminComponent', () => {
  let component: EditUserAdminComponent;
  let fixture: ComponentFixture<EditUserAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
