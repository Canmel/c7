import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZsProjectComponent } from './zs-project.component';

describe('ZsProjectComponent', () => {
  let component: ZsProjectComponent;
  let fixture: ComponentFixture<ZsProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZsProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZsProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
