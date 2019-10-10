import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectGroupAddComponent } from './project-group-add.component';

describe('ProjectGroupAddComponent', () => {
  let component: ProjectGroupAddComponent;
  let fixture: ComponentFixture<ProjectGroupAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectGroupAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectGroupAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
