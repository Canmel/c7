import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessDesignerComponent } from './process-designer.component';

describe('ProcessDesignerComponent', () => {
  let component: ProcessDesignerComponent;
  let fixture: ComponentFixture<ProcessDesignerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessDesignerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
