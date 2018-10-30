import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PgButtonComponent } from './pg-button.component';

describe('PgButtonComponent', () => {
  let component: PgButtonComponent;
  let fixture: ComponentFixture<PgButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PgButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PgButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
