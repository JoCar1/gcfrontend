import { TestBed } from '@angular/core/testing';

import { NgxRestangularService } from './ngx-restangular.service';

describe('NgxRestangularService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxRestangularService = TestBed.get(NgxRestangularService);
    expect(service).toBeTruthy();
  });
});
