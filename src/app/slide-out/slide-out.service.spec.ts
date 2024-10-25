import { TestBed } from '@angular/core/testing';

import { SlideOutService } from './slide-out.service';

describe('SlideOutService', () => {
  let service: SlideOutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlideOutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
