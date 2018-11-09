import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LefterComponent } from './lefter.component';

describe('LefterComponent', () => {
  let component: LefterComponent;
  let fixture: ComponentFixture<LefterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LefterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LefterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
