import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyBrngiComponent } from './why-brngi.component';

describe('WhyBrngiComponent', () => {
  let component: WhyBrngiComponent;
  let fixture: ComponentFixture<WhyBrngiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhyBrngiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyBrngiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
