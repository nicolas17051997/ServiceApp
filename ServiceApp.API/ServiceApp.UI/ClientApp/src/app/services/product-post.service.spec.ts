import { TestBed } from '@angular/core/testing';

import { ProductPostService } from './product-post.service';

describe('ProductPostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductPostService = TestBed.get(ProductPostService);
    expect(service).toBeTruthy();
  });
});
