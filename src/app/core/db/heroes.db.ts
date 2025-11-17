import Dexie, { Table } from 'dexie';
import { IHero } from '../models/hero.model';

export class HeroesDB extends Dexie {
  heroes!: Table<IHero, string>;

  constructor() {
    super('HeroesDB');

    this.version(1).stores({
      heroes: `id, superhero, publisher, alter_ego, &originators`,
    });
  }

  getAllHeroes() {
    return this.heroes.toArray();
  }

  addHero(hero: IHero) {
    return this.heroes.add(hero);
  }

  updateHero(hero: IHero) {
    return this.heroes.put(hero);
  }

  deleteHero(id: string) {
    return this.heroes.delete(id);
  }
}

export const db = new HeroesDB();
