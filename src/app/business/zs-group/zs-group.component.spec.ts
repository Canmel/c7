import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZsGroupComponent } from './zs-group.component';

describe('ZsGroupComponent', () => {
  let component: ZsGroupComponent;
  let fixture: ComponentFixture<ZsGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZsGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
