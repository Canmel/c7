import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZsTalentederComponent } from './zs-talenteder.component';

describe('ZsTalentederComponent', () => {
  let component: ZsTalentederComponent;
  let fixture: ComponentFixture<ZsTalentederComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZsTalentederComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZsTalentederComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
