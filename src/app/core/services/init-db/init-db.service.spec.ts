import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { InitDbService } from './init-db.service';

describe('InitDbService', () => {
  let service: InitDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],});
    service = TestBed.inject(InitDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
