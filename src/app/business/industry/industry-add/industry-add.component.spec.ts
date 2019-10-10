import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryAddComponent } from './industry-add.component';

describe('IndustryAddComponent', () => {
  let component: IndustryAddComponent;
  let fixture: ComponentFixture<IndustryAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndustryAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
