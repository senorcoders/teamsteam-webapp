import { TestBed, inject } from '@angular/core/testing';

import { PlayerRoutesService } from './player-routes.service';

describe('PlayerRoutesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerRoutesService]
    });
  });

  it('should be created', inject([PlayerRoutesService], (service: PlayerRoutesService) => {
    expect(service).toBeTruthy();
  }));
});
