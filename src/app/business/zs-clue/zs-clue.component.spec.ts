import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZsClueComponent } from './zs-clue.component';

describe('ZsClueComponent', () => {
  let component: ZsClueComponent;
  let fixture: ComponentFixture<ZsClueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZsClueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZsClueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
