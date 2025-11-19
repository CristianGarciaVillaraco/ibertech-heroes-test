import { Injectable } from '@angular/core';
import { IHero } from '../../../../core/models/hero.model';
import { HeroesDB } from '../../../../core/db/heroes.db';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private db = new HeroesDB();
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marver - Comics',
    },
  ];

  getAll(): Observable<IHero[]> {
    return from(this.db.heroes.toArray());
  }

  getById(id: string): Observable<IHero | undefined> {
    return from(this.db.heroes.get(id));
  }

  add(hero: IHero): Observable<string> {
    return from(this.db.heroes.add(hero));
  }

  update(id: string, changes: Partial<IHero>): Observable<number> {
    return from(this.db.heroes.update(id, changes));
  }

  delete(id: string): Observable<void> {
    return from(this.db.heroes.delete(id));
  }
}
