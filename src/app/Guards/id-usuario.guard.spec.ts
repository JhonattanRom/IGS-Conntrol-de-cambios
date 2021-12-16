import { TestBed, async, inject } from '@angular/core/testing';

import { IdUsuarioGuard } from './id-usuario.guard';

describe('IdUsuarioGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IdUsuarioGuard]
    });
  });

  it('should ...', inject([IdUsuarioGuard], (guard: IdUsuarioGuard) => {
    expect(guard).toBeTruthy();
  }));
});
