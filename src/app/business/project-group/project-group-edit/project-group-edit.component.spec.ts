import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectGroupEditComponent } from './project-group-edit.component';

describe('ProjectGroupEditComponent', () => {
  let component: ProjectGroupEditComponent;
  let fixture: ComponentFixture<ProjectGroupEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectGroupEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
