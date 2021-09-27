import { TestBed } from '@angular/core/testing';

import { LogedInService } from './loged-in.service';

describe('LogedInService', () => {
  let service: LogedInService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogedInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
