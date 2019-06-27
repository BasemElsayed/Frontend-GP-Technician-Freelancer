import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerSignUpComponent } from './freelancer-sign-up.component';

describe('FreelancerSignUpComponent', () => {
  let component: FreelancerSignUpComponent;
  let fixture: ComponentFixture<FreelancerSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreelancerSignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelancerSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
