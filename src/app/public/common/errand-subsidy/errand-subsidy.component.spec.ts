import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrandSubsidyComponent } from './errand-subsidy.component';

describe('ErrandSubsidyComponent', () => {
  let component: ErrandSubsidyComponent;
  let fixture: ComponentFixture<ErrandSubsidyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrandSubsidyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrandSubsidyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
