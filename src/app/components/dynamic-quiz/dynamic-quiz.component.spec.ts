import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicQuizComponent } from './dynamic-quiz.component';

describe('DynamicQuizComponent', () => {
  let component: DynamicQuizComponent;
  let fixture: ComponentFixture<DynamicQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
