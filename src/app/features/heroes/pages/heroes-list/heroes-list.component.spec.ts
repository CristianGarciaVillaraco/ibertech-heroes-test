import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import HeroesListPageComponent from './heroes-list.component';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HeroesService } from '../../services/heroes/heroes.service';
import { EPublisher } from '../../../../core/models/enums/publisher.enum';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('HeroesListPageComponent', () => {
  let component: HeroesListPageComponent;
  let fixture: ComponentFixture<HeroesListPageComponent>;
  let mockHeroesService: jasmine.SpyObj<HeroesService>;

  beforeEach(async () => {
    mockHeroesService = jasmine.createSpyObj('HeroesService', ['getFilteredHeroCards']);
    mockHeroesService.getFilteredHeroCards.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [HeroesListPageComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        provideNoopAnimations(),
        { provide: HeroesService, useValue: mockHeroesService },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParams: {} } } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroesListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('hasActiveFilters()', () => {
    it('should be false initially', () => {
      expect(component.hasActiveFilters()).toBeFalse();
    });

    it('should be true after setting searchTerm', () => {
      component.searchTerm.set('batman');
      expect(component.hasActiveFilters()).toBeTrue();
    });

    it('should be true after selecting a publisher', () => {
      component.selectedPublisher.set(EPublisher.Marvel);
      expect(component.hasActiveFilters()).toBeTrue();
    });

    it('should be true after setting nameFilter', () => {
      component.nameFilter.set('bat');
      expect(component.hasActiveFilters()).toBeTrue();
    });
  });

  describe('clearSearch()', () => {
    it('should reset searchTerm to empty string', () => {
      component.searchTerm.set('batman');
      component.clearSearch();
      expect(component.searchTerm()).toBe('');
    });
  });

  describe('clearAllFilters()', () => {
    it('should reset all filters', () => {
      component.searchTerm.set('batman');
      component.selectedPublisher.set(EPublisher.Marvel);
      component.nameFilter.set('bat');
      component.alterEgoFilter.set('bruce');
      component.clearAllFilters();
      expect(component.hasActiveFilters()).toBeFalse();
    });
  });

  describe('selectPublisher()', () => {
    it('should set publisher when not selected', () => {
      component.selectPublisher(EPublisher.DC);
      expect(component.selectedPublisher()).toBe(EPublisher.DC);
    });

    it('should toggle back to all when already selected', () => {
      component.selectedPublisher.set(EPublisher.DC);
      component.selectPublisher(EPublisher.DC);
      expect(component.selectedPublisher()).toBe('all');
    });
  });

  describe('isPublisherSelected()', () => {
    it('should return true when publisher matches', () => {
      component.selectedPublisher.set(EPublisher.Marvel);
      expect(component.isPublisherSelected(EPublisher.Marvel)).toBeTrue();
    });

    it('should return false when publisher does not match', () => {
      component.selectedPublisher.set(EPublisher.DC);
      expect(component.isPublisherSelected(EPublisher.Marvel)).toBeFalse();
    });
  });

  describe('advancedFiltersCount()', () => {
    it('should be 0 with no advanced filters', () => {
      expect(component.advancedFiltersCount()).toBe(0);
    });

    it('should count each active advanced filter', () => {
      component.nameFilter.set('bat');
      expect(component.advancedFiltersCount()).toBe(1);
      component.alterEgoFilter.set('bruce');
      expect(component.advancedFiltersCount()).toBe(2);
      component.originatorFilter.set('kane');
      expect(component.advancedFiltersCount()).toBe(3);
    });
  });

  describe('clearAdvancedFilters()', () => {
    it('should reset nameFilter, alterEgoFilter and originatorFilter', () => {
      component.nameFilter.set('bat');
      component.alterEgoFilter.set('bruce');
      component.originatorFilter.set('kane');
      component.clearAdvancedFilters();
      expect(component.advancedFiltersCount()).toBe(0);
    });
  });
});
