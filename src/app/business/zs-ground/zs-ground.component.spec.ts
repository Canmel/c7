import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZsGroundComponent } from './zs-ground.component';

describe('ZsGroundComponent', () => {
  let component: ZsGroundComponent;
  let fixture: ComponentFixture<ZsGroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZsGroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZsGroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
