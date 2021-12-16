import { TestBed } from '@angular/core/testing';

import { PrioridadesService } from './prioridades.service';

describe('PrioridadesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrioridadesService = TestBed.get(PrioridadesService);
    expect(service).toBeTruthy();
  });
});
