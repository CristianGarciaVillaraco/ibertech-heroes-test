import { Injectable, signal } from '@angular/core';
import { HeroesDB } from '../../../../core/db/heroes.db';
import { from, map, Observable } from 'rxjs';
import { HeroMapper } from '../../mappers/hero.mapper';
import {
  IHero,
  IHeroFilters,
} from '../../../../core/models/interfaces/hero.interface';
import { ICard } from '../../../../shared/ui/card/interfaces/card.interface';

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

  getHeroById(id: string): Observable<IHero> {
    return from(this.db.heroes.get(id)).pipe(
      map((hero) => {
        if (!hero) {
          throw new Error(`Hero with id "${id}" not found`);
        }
        return hero;
      }),
    );
  }

  getFilteredHeroCards(filters: IHeroFilters = {}): Observable<ICard[]> {
    return from(
      (async () => {
        let query = this.db.heroes.toCollection();

        // Filtro por superhero (nombre)
        if (filters.superhero && filters.superhero.trim()) {
          query = this.db.heroes
            .where('superhero')
            .startsWithIgnoreCase(filters.superhero.trim());
        }

        // Filtro por publisher
        if (filters.publisher && filters.publisher !== 'all') {
          const currentQuery = await query.toArray();
          const filtered = currentQuery.filter(
            (h) => h.publisher === filters.publisher,
          );
          query = this.db.heroes.where('id').anyOf(filtered.map((h) => h.id));
        }

        // Filtro por alterEgo
        if (filters.alterEgo && filters.alterEgo.trim()) {
          const currentQuery = await query.toArray();
          const filtered = currentQuery.filter((h) =>
            h.alterEgo
              .toLowerCase()
              .includes(filters.alterEgo!.toLowerCase().trim()),
          );
          query = this.db.heroes.where('id').anyOf(filtered.map((h) => h.id));
        }

        // Filtro por originator (creador)
        if (filters.originator && filters.originator.trim()) {
          const term = filters.originator.toLowerCase().trim();
          const currentQuery = await query.toArray();
          const filtered = currentQuery.filter((h) =>
            h.originators.some((o: string) => o.toLowerCase().includes(term)),
          );
          query = this.db.heroes.where('id').anyOf(filtered.map((h) => h.id));
        }

        // Búsqueda general (searchTerm)
        if (filters.searchTerm && filters.searchTerm.trim()) {
          const term = filters.searchTerm.toLowerCase().trim();
          const currentQuery = await query.toArray();
          const filtered = currentQuery.filter((h) => {
            const searchableText = [
              h.superhero,
              h.alterEgo,
              h.description,
              ...h.characters,
              ...h.originators,
            ]
              .join(' ')
              .toLowerCase();

            return searchableText.includes(term);
          });
          query = this.db.heroes.where('id').anyOf(filtered.map((h) => h.id));
        }

        const heroes = await query.toArray();
        return HeroMapper.heroListToHeroCardList(heroes);
      })(),
    );
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
