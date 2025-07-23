import { TestBed } from '@angular/core/testing';

import { BlurServiceService } from './blur-service.service';

describe('BlurServiceService', () => {
  let service: BlurServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlurServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
