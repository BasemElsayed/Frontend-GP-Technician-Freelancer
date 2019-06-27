import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableFreelancersComponent } from './available-freelancers.component';

describe('AvailableFreelancersComponent', () => {
  let component: AvailableFreelancersComponent;
  let fixture: ComponentFixture<AvailableFreelancersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableFreelancersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableFreelancersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
