import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { HeroFormComponent } from './hero-form.component';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HeroesService } from '../../services/heroes/heroes.service';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MatChipInputEvent } from '@angular/material/chips';

describe('HeroFormComponent', () => {
  let component: HeroFormComponent;
  let fixture: ComponentFixture<HeroFormComponent>;
  let mockHeroesService: jasmine.SpyObj<HeroesService>;

  beforeEach(async () => {
    mockHeroesService = jasmine.createSpyObj('HeroesService', ['getHeroById', 'add', 'update', 'delete']);

    await TestBed.configureTestingModule({
      imports: [HeroFormComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        provideNoopAnimations(),
        { provide: HeroesService, useValue: mockHeroesService },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => null } } } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create in new mode', () => {
    expect(component).toBeTruthy();
    expect(component.editing).toBeFalse();
  });

  describe('Form validation', () => {
    it('should be invalid when empty', () => {
      expect(component.heroForm.valid).toBeFalse();
    });

    it('should be valid with all required fields filled', () => {
      component.heroForm.patchValue({
        superhero: 'Green Arrow', publisher: 'DC',
        alterEgo: 'Oliver Queen', firstAppearance: 'More Fun #73',
      });
      expect(component.heroForm.valid).toBeTrue();
    });

    it('should be invalid when superhero exceeds 20 characters', () => {
      component.heroForm.patchValue({ superhero: 'A'.repeat(21) });
      expect(component.heroForm.get('superhero')?.valid).toBeFalse();
    });
  });

  describe('addChip()', () => {
    it('should add a character keyword', () => {
      const event = { value: 'Bruce Wayne', chipInput: { clear: jasmine.createSpy() } } as unknown as MatChipInputEvent;
      component.addChip(event, 'character');
      expect(component.charactersKeywords()).toContain('Bruce Wayne');
    });

    it('should not add duplicate character', () => {
      const event = { value: 'Bruce Wayne', chipInput: { clear: jasmine.createSpy() } } as unknown as MatChipInputEvent;
      component.addChip(event, 'character');
      component.addChip(event, 'character');
      expect(component.charactersKeywords().filter(k => k === 'Bruce Wayne').length).toBe(1);
    });

    it('should add an originator keyword', () => {
      const event = { value: 'Bob Kane', chipInput: { clear: jasmine.createSpy() } } as unknown as MatChipInputEvent;
      component.addChip(event, 'originator');
      expect(component.originatorsKeywords()).toContain('Bob Kane');
    });

    it('should ignore empty values', () => {
      const event = { value: '   ', chipInput: { clear: jasmine.createSpy() } } as unknown as MatChipInputEvent;
      component.addChip(event, 'character');
      expect(component.charactersKeywords().length).toBe(0);
    });
  });

  describe('removeChip()', () => {
    it('should remove a character', () => {
      component.charactersKeywords.set(['Bruce Wayne', 'Terry McGinnis']);
      component.removeChip('Bruce Wayne', 'character');
      expect(component.charactersKeywords()).not.toContain('Bruce Wayne');
      expect(component.charactersKeywords()).toContain('Terry McGinnis');
    });

    it('should remove an originator', () => {
      component.originatorsKeywords.set(['Bob Kane', 'Bill Finger']);
      component.removeChip('Bob Kane', 'originator');
      expect(component.originatorsKeywords()).not.toContain('Bob Kane');
      expect(component.originatorsKeywords()).toContain('Bill Finger');
    });
  });

  describe('generateId()', () => {
    it('should build id from publisher and superhero', () => {
      component.heroForm.patchValue({ publisher: 'DC', superhero: 'Green Arrow' });
      expect(component.generateId()).toBe('dc-green-arrow');
    });

    it('should handle spaces in superhero name', () => {
      component.heroForm.patchValue({ publisher: 'Marvel', superhero: 'Spider Man' });
      expect(component.generateId()).toBe('marvel-spider-man');
    });
  });
});
