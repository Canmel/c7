import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrandAddComponent } from './errand-add.component';

describe('ErrandAddComponent', () => {
  let component: ErrandAddComponent;
  let fixture: ComponentFixture<ErrandAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrandAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrandAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
