import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { HeroesService } from './heroes.service';
import { EPublisher } from '../../../../core/models/enums/publisher.enum';
import { DEFAULT_POWER_STATS, IHero } from '../../../../core/models/interfaces/hero.interface';

const MOCK_HERO: IHero = {
  id: 'dc-batman', key: 'dc-batman', superhero: 'Batman',
  publisher: EPublisher.DC, alterEgo: 'Bruce Wayne',
  firstAppearance: 'Detective Comics #27',
  characters: ['Bruce Wayne'], originators: ['Bob Kane'],
  description: 'Dark Knight', powerStats: DEFAULT_POWER_STATS,
};

describe('HeroesService', () => {
  let service: HeroesService;
  let db: any;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection()] });
    service = TestBed.inject(HeroesService);
    db = (service as any).db;
  });

  it('should be created', () => { expect(service).toBeTruthy(); });

  describe('getAll()', () => {
    it('should return heroes from db', (done) => {
      spyOn(db.heroes, 'toArray').and.returnValue(Promise.resolve([MOCK_HERO]));
      service.getAll().subscribe(heroes => {
        expect(heroes.length).toBe(1);
        expect(heroes[0].superhero).toBe('Batman');
        done();
      });
    });
    it('should return empty array when no heroes', (done) => {
      spyOn(db.heroes, 'toArray').and.returnValue(Promise.resolve([]));
      service.getAll().subscribe(heroes => { expect(heroes).toEqual([]); done(); });
    });
  });

  describe('getHeroById()', () => {
    it('should return hero when found', (done) => {
      spyOn(db.heroes, 'get').and.returnValue(Promise.resolve(MOCK_HERO));
      service.getHeroById('dc-batman').subscribe(hero => {
        expect(hero.id).toBe('dc-batman'); done();
      });
    });
    it('should throw error when hero not found', (done) => {
      spyOn(db.heroes, 'get').and.returnValue(Promise.resolve(undefined));
      service.getHeroById('nonexistent').subscribe({ error: (err: Error) => { expect(err.message).toContain('not found'); done(); } });
    });
  });

  describe('add()', () => {
    it('should call db.heroes.add and return the id', (done) => {
      spyOn(db.heroes, 'add').and.returnValue(Promise.resolve('dc-batman'));
      service.add(MOCK_HERO).subscribe(id => {
        expect(db.heroes.add).toHaveBeenCalledWith(MOCK_HERO);
        expect(id).toBe('dc-batman'); done();
      });
    });
  });

  describe('update()', () => {
    it('should call db.heroes.update with correct args', (done) => {
      spyOn(db.heroes, 'update').and.returnValue(Promise.resolve(1));
      service.update('dc-batman', { superhero: 'Batman Updated' }).subscribe(count => {
        expect(db.heroes.update).toHaveBeenCalledWith('dc-batman', { superhero: 'Batman Updated' });
        expect(count).toBe(1); done();
      });
    });
  });

  describe('delete()', () => {
    it('should call db.heroes.delete with the id', (done) => {
      spyOn(db.heroes, 'delete').and.returnValue(Promise.resolve());
      service.delete('dc-batman').subscribe(() => {
        expect(db.heroes.delete).toHaveBeenCalledWith('dc-batman'); done();
      });
    });
  });
});
