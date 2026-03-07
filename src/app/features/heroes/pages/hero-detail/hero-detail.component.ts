import { Component, inject, input } from '@angular/core';
import { HeroBiographyComponent } from '../../components/hero-biography/hero-biography.component';
import { HeroComicSectionComponent } from '../../components/hero-comic-section/hero-comic-section.component';
import { HeroStatsComponent } from '../../components/hero-stats/hero-stats.component';
import { HeroInfoCardsComponent } from '../../components/hero-info-cards/hero-info-cards.component';
import { HeroRadarChartComponent } from '../../components/hero-radar-chart/hero-radar-chart.component';
import { Router, RouterModule } from '@angular/router';
import { HeroesService } from '../../services/heroes/heroes.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-hero-detail',
  imports: [
    HeroBiographyComponent,
    HeroComicSectionComponent,
    HeroStatsComponent,
    HeroInfoCardsComponent,
    HeroRadarChartComponent,
    MatIcon,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css',
})
export default class HeroDetailComponent {
  private router = inject(Router);
  private heroesService = inject(HeroesService);

  id = input.required<string>();
  heroResource = rxResource({
    params: () => ({ id: this.id() }),
    stream: ({ params }) => this.heroesService.getHeroById(params.id),
  });

  hero = this.heroResource.value;
  isLoading = this.heroResource.isLoading;
  error = this.heroResource.error;

  goBack(): void {
    this.router.navigate(['/heroes/list']);
  }

  editHero(): void {
    this.router.navigate(['/heroes/edit', this.id()]);
  }

  deleteHero(): void {
    const name = this.hero()?.superhero ?? 'este héroe';
    if (!confirm(`¿Eliminar a ${name}? Esta acción no se puede deshacer.`)) return;
    this.heroesService.delete(this.id()).subscribe(() => {
      this.router.navigate(['/heroes/list']);
    });
  }
}
