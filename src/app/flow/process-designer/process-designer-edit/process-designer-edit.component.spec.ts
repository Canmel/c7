import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessDesignerEditComponent } from './process-designer-edit.component';

describe('ProcessDesignerEditComponent', () => {
  let component: ProcessDesignerEditComponent;
  let fixture: ComponentFixture<ProcessDesignerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessDesignerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessDesignerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
