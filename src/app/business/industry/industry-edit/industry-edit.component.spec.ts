import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryEditComponent } from './industry-edit.component';

describe('IndustryEditComponent', () => {
  let component: IndustryEditComponent;
  let fixture: ComponentFixture<IndustryEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndustryEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
