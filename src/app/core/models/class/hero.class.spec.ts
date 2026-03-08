import { HeroModel } from './hero.class';
import { EPublisher } from '../enums/publisher.enum';
import { DEFAULT_POWER_STATS } from '../interfaces/hero.interface';

const BASE_HERO = {
  id: 'dc-batman',
  key: 'dc-batman',
  superhero: 'Batman',
  publisher: EPublisher.DC,
  alterEgo: 'Bruce Wayne',
  firstAppearance: 'Detective Comics #27',
  characters: ['Bruce Wayne'],
  originators: ['Bob Kane', 'Bill Finger'],
  description: 'Dark Knight of Gotham',
};

describe('HeroModel', () => {
  describe('constructor with no data', () => {
    it('should set empty strings for text fields', () => {
      const hero = new HeroModel();
      expect(hero.id).toBe('');
      expect(hero.key).toBe('');
      expect(hero.superhero).toBe('');
      expect(hero.alterEgo).toBe('');
      expect(hero.firstAppearance).toBe('');
      expect(hero.description).toBe('');
    });

    it('should default publisher to DC', () => {
      expect(new HeroModel().publisher).toBe(EPublisher.DC);
    });

    it('should default arrays to empty', () => {
      const hero = new HeroModel();
      expect(hero.characters).toEqual([]);
      expect(hero.originators).toEqual([]);
    });

    it('should default powerStats to DEFAULT_POWER_STATS', () => {
      expect(new HeroModel().powerStats).toEqual(DEFAULT_POWER_STATS);
    });

    it('should leave fileManager undefined', () => {
      expect(new HeroModel().fileManager).toBeUndefined();
    });
  });

  describe('constructor with full data', () => {
    it('should map all text fields correctly', () => {
      const hero = new HeroModel(BASE_HERO);
      expect(hero.id).toBe('dc-batman');
      expect(hero.key).toBe('dc-batman');
      expect(hero.superhero).toBe('Batman');
      expect(hero.alterEgo).toBe('Bruce Wayne');
      expect(hero.firstAppearance).toBe('Detective Comics #27');
      expect(hero.description).toBe('Dark Knight of Gotham');
    });

    it('should set publisher correctly', () => {
      expect(new HeroModel(BASE_HERO).publisher).toBe(EPublisher.DC);
    });

    it('should set arrays correctly', () => {
      const hero = new HeroModel(BASE_HERO);
      expect(hero.characters).toEqual(['Bruce Wayne']);
      expect(hero.originators).toEqual(['Bob Kane', 'Bill Finger']);
    });

    it('should use DEFAULT_POWER_STATS when powerStats not provided', () => {
      expect(new HeroModel(BASE_HERO).powerStats).toEqual(DEFAULT_POWER_STATS);
    });

    it('should use provided powerStats', () => {
      const stats = { strength: 100, speed: 90, intelligence: 80, durability: 70, combat: 60, power: 50 };
      const hero = new HeroModel({ ...BASE_HERO, powerStats: stats });
      expect(hero.powerStats).toEqual(stats);
    });

    it('should set fileManager when provided', () => {
      const fm = { imgBg: 'bg.jpg', imgHero: 'hero.jpg', imgFA: 'fa.jpg' };
      expect(new HeroModel({ ...BASE_HERO, fileManager: fm }).fileManager).toEqual(fm);
    });
  });
});
