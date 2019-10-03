import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPassworddComponent } from './reset-passwordd.component';

describe('ResetPassworddComponent', () => {
  let component: ResetPassworddComponent;
  let fixture: ComponentFixture<ResetPassworddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPassworddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPassworddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
