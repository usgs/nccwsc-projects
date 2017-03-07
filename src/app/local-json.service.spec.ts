/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LocalJsonService } from './local-json.service';

describe('LocalJsonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalJsonService]
    });
  });

  it('should ...', inject([LocalJsonService], (service: LocalJsonService) => {
    expect(service).toBeTruthy();
  }));
});
