import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryBookComponent } from './history-book.component';

describe('HistoryBookComponent', () => {
  let component: HistoryBookComponent;
  let fixture: ComponentFixture<HistoryBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
