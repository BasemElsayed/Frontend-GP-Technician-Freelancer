import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerHomeComponent } from './freelancer-home.component';

describe('FreelancerHomeComponent', () => {
  let component: FreelancerHomeComponent;
  let fixture: ComponentFixture<FreelancerHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreelancerHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelancerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
