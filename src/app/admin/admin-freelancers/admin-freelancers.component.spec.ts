import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFreelancersComponent } from './admin-freelancers.component';

describe('AdminFreelancersComponent', () => {
  let component: AdminFreelancersComponent;
  let fixture: ComponentFixture<AdminFreelancersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFreelancersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFreelancersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
