import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BailyTableComponent } from './baily-table.component';

describe('BailyTableComponent', () => {
  let component: BailyTableComponent;
  let fixture: ComponentFixture<BailyTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BailyTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BailyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
