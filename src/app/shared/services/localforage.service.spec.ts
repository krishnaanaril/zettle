import { TestBed } from '@angular/core/testing';

import { LocalforageService } from './localforage.service';

describe('LocalforageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalforageService = TestBed.get(LocalforageService);
    expect(service).toBeTruthy();
  });
});
