import { TestBed, inject } from '@angular/core/testing';

import { MyGuardService } from './my-guard.service';

describe('MyGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyGuardService]
    });
  });

  it('should be created', inject([MyGuardService], (service: MyGuardService) => {
    expect(service).toBeTruthy();
  }));
});
