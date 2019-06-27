import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFreelancerComponent } from './view-freelancer.component';

describe('ViewFreelancerComponent', () => {
  let component: ViewFreelancerComponent;
  let fixture: ComponentFixture<ViewFreelancerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFreelancerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFreelancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
