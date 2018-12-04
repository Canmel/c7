import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimbursementAddComponent } from './reimbursement-add.component';

describe('ReimbursementAddComponent', () => {
  let component: ReimbursementAddComponent;
  let fixture: ComponentFixture<ReimbursementAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimbursementAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbursementAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
