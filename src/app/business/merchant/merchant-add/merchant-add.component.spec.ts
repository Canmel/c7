import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantAddComponent } from './merchant-add.component';

describe('MerchantAddComponent', () => {
  let component: MerchantAddComponent;
  let fixture: ComponentFixture<MerchantAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
