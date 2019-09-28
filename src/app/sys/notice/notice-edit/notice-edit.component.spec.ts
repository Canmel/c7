import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeEditComponent } from './notice-edit.component';

describe('NoticeEditComponent', () => {
  let component: NoticeEditComponent;
  let fixture: ComponentFixture<NoticeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
