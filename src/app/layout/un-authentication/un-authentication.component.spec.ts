import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnAuthenticationComponent } from './un-authentication.component';

describe('UnAuthenticationComponent', () => {
  let component: UnAuthenticationComponent;
  let fixture: ComponentFixture<UnAuthenticationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnAuthenticationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
