import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrandEditComponent } from './errand-edit.component';

describe('ErrandEditComponent', () => {
  let component: ErrandEditComponent;
  let fixture: ComponentFixture<ErrandEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrandEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrandEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
