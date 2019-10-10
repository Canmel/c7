import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMonitorEditComponent } from './project-monitor-edit.component';

describe('ProjectMonitorEditComponent', () => {
  let component: ProjectMonitorEditComponent;
  let fixture: ComponentFixture<ProjectMonitorEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectMonitorEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMonitorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
