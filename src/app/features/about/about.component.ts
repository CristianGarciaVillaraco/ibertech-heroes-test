import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { IRoadmapConfig } from '../../core/models/interfaces/roadmap.interface';
import roadmap from '../../../../public/roadmap.json';
import { MatIconModule } from '@angular/material/icon';
import { rxResource } from '@angular/core/rxjs-interop';
import { HeroesService } from '../heroes/services/heroes/heroes.service';
import { IHero } from '../../core/models/interfaces/hero.interface';
import { EPublisher } from '../../core/models/enums/publisher.enum';

@Component({
  selector: 'app-about',
  imports: [MatButtonModule, MatListModule, MatIconModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  roadmapConfig: IRoadmapConfig = roadmap;

  private heroesService = inject(HeroesService);

  heroesResource = rxResource({
    stream: () => this.heroesService.getAll(),
  });

  stats = computed(() => {
    const heroes: IHero[] = (this.heroesResource.value() as IHero[]) ?? [];
    const total = heroes.length;

    const byPublisher: Record<string, number> = heroes.reduce(
      (acc: Record<string, number>, h: IHero) => {
        acc[h.publisher] = (acc[h.publisher] ?? 0) + 1;
        return acc;
      },
      {},
    );

    // Incluir todos los publishers del enum, aunque tengan 0 héroes
    const allPublishers = Object.values(EPublisher);
    const publisherBars = allPublishers
      .map((name) => {
        const count = byPublisher[name] ?? 0;
        return { name, count, pct: total > 0 ? Math.round((count / total) * 100) : 0 };
      })
      .sort((a, b) => b.count - a.count);

    const withDescription = heroes.filter((h: IHero) => h.description?.trim()).length;
    const withCharacters = heroes.filter((h: IHero) => h.characters?.length > 0).length;

    return { total, publisherBars, withDescription, withCharacters };
  });
}
