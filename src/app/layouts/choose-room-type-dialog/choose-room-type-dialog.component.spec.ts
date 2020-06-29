import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseRoomTypeDialogComponent } from './choose-room-type-dialog.component';

describe('ChooseRoomTypeDialogComponent', () => {
  let component: ChooseRoomTypeDialogComponent;
  let fixture: ComponentFixture<ChooseRoomTypeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseRoomTypeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseRoomTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
