import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { HeroesService } from './heroes.service';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

describe('ServicesService', () => {
  let httpTestingController: HttpTestingController;
  let service: HeroesService;
  let baseUrl = 'http://localhost:4200/heroes';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HeroesService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('Should bew creted correcly', () => {
    expect(service).toBeTruthy();
  });

  describe('Testing the tests that call the backend', () => {});
});
