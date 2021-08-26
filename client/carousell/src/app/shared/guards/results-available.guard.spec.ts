import { TestBed } from '@angular/core/testing';

import { ResultsAvailableGuard } from './results-available.guard';

describe('ResultsAvailableGuard', () => {
  let guard: ResultsAvailableGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ResultsAvailableGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
