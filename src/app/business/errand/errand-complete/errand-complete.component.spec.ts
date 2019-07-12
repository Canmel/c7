import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrandCompleteComponent } from './errand-complete.component';

describe('ErrandCompleteComponent', () => {
  let component: ErrandCompleteComponent;
  let fixture: ComponentFixture<ErrandCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrandCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrandCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
