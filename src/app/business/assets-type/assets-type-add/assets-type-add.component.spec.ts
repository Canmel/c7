import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsTypeAddComponent } from './assets-type-add.component';

describe('AssetsTypeAddComponent', () => {
  let component: AssetsTypeAddComponent;
  let fixture: ComponentFixture<AssetsTypeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetsTypeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
