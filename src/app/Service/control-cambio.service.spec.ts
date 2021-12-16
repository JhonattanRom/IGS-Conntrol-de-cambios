import { TestBed } from '@angular/core/testing';

import { ControlCambioService } from './control-cambio.service';

describe('ControlCambioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ControlCambioService = TestBed.get(ControlCambioService);
    expect(service).toBeTruthy();
  });
});
