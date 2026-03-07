import { IHero } from '../../../core/models/interfaces/hero.interface';
import { ICard } from '../../../shared/ui/card/interfaces/card.interface';

export class HeroMapper {
  // IHeroCard
  static heroToHeroCard(hero: IHero): ICard {
    return {
      id: hero.id,
      title: hero.superhero,
      imgBg: hero.fileManager?.imgBg ?? 'no-image.jpg',
      imgHero: hero.fileManager?.imgHero ?? '',
      imgFront: hero.fileManager?.imgFA ?? '',
    };
  }

  static heroListToHeroCardList(heroList: IHero[]): ICard[] {
    if (!heroList) return [];
    return heroList.map((hero) => this.heroToHeroCard(hero));
  }
}
