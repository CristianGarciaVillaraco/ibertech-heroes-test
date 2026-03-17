import Dexie, { Table } from 'dexie';
import { IHero } from '../models/interfaces/hero.interface';

export class HeroesDB extends Dexie {
  heroes!: Table<IHero, string>;

  constructor() {
    super('HeroesDB');
    this.version(1).stores({
      heroes: `++id, superhero, publisher, alterEgo, *originators`,
    });
    this.version(2).stores({
      heroes: `id, superhero, publisher, alterEgo, *originators`,
    });
  }
}

export const db = new HeroesDB();
