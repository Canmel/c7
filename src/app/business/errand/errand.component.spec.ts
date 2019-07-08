import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrandComponent } from './errand.component';

describe('ErrandComponent', () => {
  let component: ErrandComponent;
  let fixture: ComponentFixture<ErrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
