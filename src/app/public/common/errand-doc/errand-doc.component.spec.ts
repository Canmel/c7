import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrandDocComponent } from './errand-doc.component';

describe('ErrandDocComponent', () => {
  let component: ErrandDocComponent;
  let fixture: ComponentFixture<ErrandDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrandDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrandDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
