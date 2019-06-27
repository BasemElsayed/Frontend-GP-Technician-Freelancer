import { TestBed, async, inject } from '@angular/core/testing';

import { Auth3Guard } from './auth3.guard';

describe('Auth3Guard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Auth3Guard]
    });
  });

  it('should ...', inject([Auth3Guard], (guard: Auth3Guard) => {
    expect(guard).toBeTruthy();
  }));
});
