import { TestBed } from '@angular/core/testing';

import { LocalstoragerefService } from './localstorageref.service';

describe('LocalstoragerefService', () => {
  let service: LocalstoragerefService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalstoragerefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
