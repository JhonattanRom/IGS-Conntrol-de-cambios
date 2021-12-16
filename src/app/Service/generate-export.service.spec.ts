import { TestBed } from '@angular/core/testing';

import { GenerateExportService } from './generate-export.service';

describe('GenerateExportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenerateExportService = TestBed.get(GenerateExportService);
    expect(service).toBeTruthy();
  });
});
