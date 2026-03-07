import { Injectable } from '@angular/core';
import { db } from '../../db/heroes.db';
import { HEROES_LIST } from '../../mocks/heroes.mock';

@Injectable({
  providedIn: 'root',
})
export class InitDbService {
  async init(): Promise<void> {
    try {
      await db.heroes.clear();
      const count = await db.heroes.count();
      if (count > 0) return;
      await db.heroes.bulkAdd(HEROES_LIST);
    } catch (e) {
      console.error('Error en bulkAdd:', e);
    }
  }
}
