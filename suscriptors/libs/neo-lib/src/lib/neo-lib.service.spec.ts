import { TestBed } from '@angular/core/testing';

import { NeoLibService } from './neo-lib.service';

describe('NeoLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NeoLibService = TestBed.get(NeoLibService);
    expect(service).toBeTruthy();
  });
});
