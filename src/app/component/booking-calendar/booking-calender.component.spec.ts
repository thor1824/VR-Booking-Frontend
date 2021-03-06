import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingCalenderComponent } from './booking-calender.component';

describe('CalenderComponent', () => {
  let component: BookingCalenderComponent;
  let fixture: ComponentFixture<BookingCalenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookingCalenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
