import { TestBed } from '@angular/core/testing';

import { HttpRequestsService } from './httpservice.service';

describe('HttpserviceService', () => {
  let service: HttpRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
