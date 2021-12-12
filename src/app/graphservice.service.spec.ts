import { TestBed } from '@angular/core/testing';

import { GraphserviceService } from './graphservice.service';

describe('GraphserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphserviceService = TestBed.get(GraphserviceService);
    expect(service).toBeTruthy();
  });
});
