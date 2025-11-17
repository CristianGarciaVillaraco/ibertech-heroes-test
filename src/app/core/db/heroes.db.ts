import Dexie, { Table } from 'dexie';
import { Hero } from '../../features/heroes/interfaces/hero.interface';

export class HeroesDB extends Dexie {
  heroes!: Table<Hero, number>;

  constructor() {
    super('HeroesDB');

    this.version(1).stores({
      heroes: `id, superhero, publisher, alter_ego, &originators`,
    });
  }
}

export const db = new HeroesDB();
