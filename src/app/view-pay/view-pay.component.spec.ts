import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPayComponent } from './view-pay.component';

describe('ViewPayComponent', () => {
  let component: ViewPayComponent;
  let fixture: ComponentFixture<ViewPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
