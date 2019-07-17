import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsExpenseComponent } from './trips-expense.component';

describe('TripsExpenseComponent', () => {
  let component: TripsExpenseComponent;
  let fixture: ComponentFixture<TripsExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripsExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripsExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
