import { Injectable } from '@angular/core';
import { db } from '../../db/heroes.db';
import { Hero } from '../../../features/heroes/interfaces/hero.interface';
import { HEROES_MOCK } from '../../mocks/heroes.mock';

@Injectable({
  providedIn: 'root',
})
export class InitDbService {
  async init(): Promise<void> {
    const count = await db.heroes.count();
    if (count > 0) return;

    await db.heroes.bulkAdd(HEROES_MOCK);
  }
}
