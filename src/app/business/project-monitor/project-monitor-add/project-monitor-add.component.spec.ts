import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMonitorAddComponent } from './project-monitor-add.component';

describe('ProjectMonitorAddComponent', () => {
  let component: ProjectMonitorAddComponent;
  let fixture: ComponentFixture<ProjectMonitorAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectMonitorAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMonitorAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
