import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFlowAddComponent } from './work-flow-add.component';

describe('WorkFlowAddComponent', () => {
  let component: WorkFlowAddComponent;
  let fixture: ComponentFixture<WorkFlowAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkFlowAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFlowAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
