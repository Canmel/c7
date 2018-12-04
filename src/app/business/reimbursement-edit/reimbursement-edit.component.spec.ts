import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimbursementEditComponent } from './reimbursement-edit.component';

describe('ReimbursementEditComponent', () => {
  let component: ReimbursementEditComponent;
  let fixture: ComponentFixture<ReimbursementEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimbursementEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbursementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
