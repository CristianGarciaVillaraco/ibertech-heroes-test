import { HeroMapper } from './hero.mapper';
import { EPublisher } from '../../../core/models/enums/publisher.enum';
import { DEFAULT_POWER_STATS, IHero } from '../../../core/models/interfaces/hero.interface';

const MOCK_HERO: IHero = {
  id: 'dc-batman',
  key: 'dc-batman',
  superhero: 'Batman',
  publisher: EPublisher.DC,
  alterEgo: 'Bruce Wayne',
  firstAppearance: 'Detective Comics #27',
  characters: ['Bruce Wayne'],
  originators: ['Bob Kane'],
  description: 'Dark Knight',
  fileManager: { imgBg: 'bg.jpg', imgHero: 'hero.jpg', imgFA: 'fa.jpg' },
  powerStats: DEFAULT_POWER_STATS,
};

describe('HeroMapper', () => {
  describe('heroToHeroCard', () => {
    it('should map id and title correctly', () => {
      const card = HeroMapper.heroToHeroCard(MOCK_HERO);
      expect(card.id).toBe('dc-batman');
      expect(card.title).toBe('Batman');
    });

    it('should map fileManager images correctly', () => {
      const card = HeroMapper.heroToHeroCard(MOCK_HERO);
      expect(card.imgBg).toBe('bg.jpg');
      expect(card.imgHero).toBe('hero.jpg');
      expect(card.imgFront).toBe('fa.jpg');
    });

    it('should use fallback imgBg when fileManager is undefined', () => {
      const card = HeroMapper.heroToHeroCard({ ...MOCK_HERO, fileManager: undefined });
      expect(card.imgBg).toBe('no-image.jpg');
    });

    it('should use empty string for imgHero when fileManager is undefined', () => {
      const card = HeroMapper.heroToHeroCard({ ...MOCK_HERO, fileManager: undefined });
      expect(card.imgHero).toBe('');
      expect(card.imgFront).toBe('');
    });
  });

  describe('heroListToHeroCardList', () => {
    it('should map a list of heroes to cards', () => {
      const cards = HeroMapper.heroListToHeroCardList([MOCK_HERO, MOCK_HERO]);
      expect(cards.length).toBe(2);
      expect(cards[0].title).toBe('Batman');
    });

    it('should return empty array for empty list', () => {
      expect(HeroMapper.heroListToHeroCardList([])).toEqual([]);
    });

    it('should return empty array when passed null', () => {
      expect(HeroMapper.heroListToHeroCardList(null as any)).toEqual([]);
    });

    it('should preserve order of input list', () => {
      const hero2: IHero = { ...MOCK_HERO, id: 'marvel-spider-man', superhero: 'Spider-Man' };
      const cards = HeroMapper.heroListToHeroCardList([MOCK_HERO, hero2]);
      expect(cards[0].title).toBe('Batman');
      expect(cards[1].title).toBe('Spider-Man');
    });
  });
});
