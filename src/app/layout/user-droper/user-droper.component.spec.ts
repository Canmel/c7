import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDroperComponent } from './user-droper.component';

describe('UserDroperComponent', () => {
  let component: UserDroperComponent;
  let fixture: ComponentFixture<UserDroperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDroperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDroperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
