import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsTypeEditComponent } from './assets-type-edit.component';

describe('AssetsTypeEditComponent', () => {
  let component: AssetsTypeEditComponent;
  let fixture: ComponentFixture<AssetsTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetsTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
