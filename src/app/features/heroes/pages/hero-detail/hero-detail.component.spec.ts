import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { Location } from '@angular/common';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import HeroDetailComponent from './hero-detail.component';
import { HeroesService } from '../../services/heroes/heroes.service';
import { of } from 'rxjs';
import { DEFAULT_POWER_STATS, IHero } from '../../../../core/models/interfaces/hero.interface';
import { EPublisher } from '../../../../core/models/enums/publisher.enum';

const MOCK_HERO: IHero = {
  id: 'dc-batman', key: 'dc-batman', superhero: 'Batman',
  publisher: EPublisher.DC, alterEgo: 'Bruce Wayne',
  firstAppearance: 'Detective Comics #27',
  characters: ['Bruce Wayne'], originators: ['Bob Kane'],
  description: 'Dark Knight', powerStats: DEFAULT_POWER_STATS,
};

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockHeroesService: jasmine.SpyObj<HeroesService>;

  beforeEach(async () => {
    mockHeroesService = jasmine.createSpyObj('HeroesService', ['getHeroById', 'delete']);
    mockHeroesService.getHeroById.and.returnValue(of(MOCK_HERO));

    await TestBed.configureTestingModule({
      imports: [HeroDetailComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        provideNoopAnimations(),
        { provide: HeroesService, useValue: mockHeroesService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', 'dc-batman');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('editHero should navigate to edit route', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    component.editHero();
    expect(router.navigate).toHaveBeenCalledWith(['/heroes/edit', 'dc-batman']);
  });
});
