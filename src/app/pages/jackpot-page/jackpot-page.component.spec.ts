import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JackpotPageComponent } from './jackpot-page.component';

describe('JackpotPageComponent', () => {
  let component: JackpotPageComponent;
  let fixture: ComponentFixture<JackpotPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JackpotPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JackpotPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
