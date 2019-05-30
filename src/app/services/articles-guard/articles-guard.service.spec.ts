import { TestBed } from '@angular/core/testing';

import { ArticlesGuardService } from './articles-guard.service';

describe('ArticlesGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArticlesGuardService = TestBed.get(ArticlesGuardService);
    expect(service).toBeTruthy();
  });
});
