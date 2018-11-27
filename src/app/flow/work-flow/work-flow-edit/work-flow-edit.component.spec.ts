import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFlowEditComponent } from './work-flow-edit.component';

describe('WorkFlowEditComponent', () => {
  let component: WorkFlowEditComponent;
  let fixture: ComponentFixture<WorkFlowEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkFlowEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFlowEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
