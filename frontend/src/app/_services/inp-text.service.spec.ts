import { TestBed, inject } from '@angular/core/testing';

import { InpTextService } from './inp-text.service';

describe('InpTextService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InpTextService]
    });
  });

  it('should be created', inject([InpTextService], (service: InpTextService) => {
    expect(service).toBeTruthy();
  }));
});
