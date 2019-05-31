import { TestBed } from '@angular/core/testing';

import { SignedUserService } from './signed-user.service';

describe('SignedUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SignedUserService = TestBed.get(SignedUserService);
    expect(service).toBeTruthy();
  });
});
