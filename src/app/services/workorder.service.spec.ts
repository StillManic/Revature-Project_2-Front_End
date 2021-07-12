import { TestBed } from '@angular/core/testing';

import { WorkorderService } from './workorder.service';

describe('WorkorderService', () => {
  let service: WorkorderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkorderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
