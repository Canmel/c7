import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MacroAddComponent } from './macro-add.component';

describe('MacroAddComponent', () => {
  let component: MacroAddComponent;
  let fixture: ComponentFixture<MacroAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MacroAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MacroAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
