import { TestBed, inject } from '@angular/core/testing';

import { NccwscDrupalService } from './nccwsc-drupal.service';

describe('NccwscDrupalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NccwscDrupalService]
    });
  });

  it('should ...', inject([NccwscDrupalService], (service: NccwscDrupalService) => {
    expect(service).toBeTruthy();
  }));
});
