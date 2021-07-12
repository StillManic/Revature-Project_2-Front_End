import { TestBed } from '@angular/core/testing';

import { PartlookupService } from './partlookup.service';

describe('PartlookupService', () => {
  let service: PartlookupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartlookupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
