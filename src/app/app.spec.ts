import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { HeroesService } from './features/heroes/services/heroes/heroes.service';
import { of } from 'rxjs';
import { App } from './app';

describe('App', () => {
  let mockHeroesService: jasmine.SpyObj<HeroesService>;

  beforeEach(async () => {
    mockHeroesService = jasmine.createSpyObj('HeroesService', ['getAll', 'getFilteredHeroCards']);
    mockHeroesService.getAll.and.returnValue(of([]));
    mockHeroesService.getFilteredHeroCards.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        provideNoopAnimations(),
        { provide: HeroesService, useValue: mockHeroesService },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should contain a router-outlet', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
