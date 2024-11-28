import { TestBed } from '@angular/core/testing';

import { StockTiendaService } from './stock-tienda.service';

describe('StockTiendaService', () => {
  let service: StockTiendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockTiendaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
