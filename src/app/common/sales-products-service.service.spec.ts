import { TestBed } from '@angular/core/testing';

import { SalesProductsServiceService } from './sales-products-service.service';

describe('SalesProductsServiceService', () => {
  let service: SalesProductsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesProductsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
