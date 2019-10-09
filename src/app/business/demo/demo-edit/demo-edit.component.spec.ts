import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoEditComponent } from './demo-edit.component';

describe('DemoEditComponent', () => {
  let component: DemoEditComponent;
  let fixture: ComponentFixture<DemoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
