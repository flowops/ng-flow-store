import { TestBed } from '@angular/core/testing';

import { NStore<T> } from './n-store';

describe('NStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NStore<T> = TestBed.get(NStore<T>);
    expect(service).toBeTruthy();
  });
});
