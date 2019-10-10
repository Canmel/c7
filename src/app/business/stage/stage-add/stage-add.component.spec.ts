import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StageAddComponent } from './stage-add.component';

describe('StageAddComponent', () => {
  let component: StageAddComponent;
  let fixture: ComponentFixture<StageAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StageAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
