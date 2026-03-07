import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { HeroesService } from '../../services/heroes/heroes.service';
import { CardComponent } from '../../../../shared/ui/card/card.component';
import { EPublisher } from '../../../../core/models/enums/publisher.enum';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatLabel, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IHeroFilters } from '../../../../core/models/interfaces/hero.interface';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-heroes-list',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatLabel,
    CardComponent,
    RouterModule,
  ],
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.css',
})
export default class HeroesListPageComponent {
  private heroesService = inject(HeroesService);
  private router = inject(Router);

  // Signals para filtros
  searchTerm = signal<string>('');
  selectedPublisher = signal<EPublisher | 'all'>('all');
  nameFilter = signal<string>('');
  alterEgoFilter = signal<string>('');
  originatorFilter = signal<string>('');
  showAdvancedFilters = signal<boolean>(false);

  // Publishers disponibles para el filtro
  publishers: EPublisher[] = Object.values(EPublisher);

  // Array para renderizar skeleton cards durante la carga
  readonly skeletonItems = Array(8).fill(0);

  // Computed signal que agrupa todos los filtros
  filters = computed(
    (): IHeroFilters => ({
      searchTerm: this.searchTerm() || undefined,
      publisher:
        this.selectedPublisher() !== 'all'
          ? this.selectedPublisher()
          : undefined,
      superhero: this.nameFilter() || undefined,
      alterEgo: this.alterEgoFilter() || undefined,
      originator: this.originatorFilter() || undefined,
    }),
  );

  // Resource para cargar héroes
  heroCardsResource = rxResource({
    params: () => this.filters(),
    stream: ({ params: filters }) =>
      this.heroesService.getFilteredHeroCards(filters),
  });

  heroCards = computed(() => this.heroCardsResource.value() ?? []);
  heroCount = computed(() => this.heroCards().length);
  isLoading = computed(() => this.heroCardsResource.isLoading());
  hasError = computed(() => this.heroCardsResource.error());

  hasAdvancedFilters = computed(() => {
    return (
      this.nameFilter() !== '' ||
      this.alterEgoFilter() !== '' ||
      this.originatorFilter() !== ''
    );
  });

  advancedFiltersCount = computed(() => {
    let count = 0;
    if (this.nameFilter()) count++;
    if (this.alterEgoFilter()) count++;
    if (this.originatorFilter()) count++;
    return count;
  });

  hasActiveFilters = computed(() => {
    return (
      this.searchTerm() !== '' ||
      this.selectedPublisher() !== 'all' ||
      this.hasAdvancedFilters()
    );
  });

  // Métodos para limpiar filtros
  clearSearch(): void {
    this.searchTerm.set('');
  }

  clearPublisher(): void {
    this.selectedPublisher.set('all');
  }

  clearNameFilter(): void {
    this.nameFilter.set('');
  }

  clearAlterEgoFilter(): void {
    this.alterEgoFilter.set('');
  }

  clearOriginatorFilter(): void {
    this.originatorFilter.set('');
  }

  clearAllFilters(): void {
    this.searchTerm.set('');
    this.selectedPublisher.set('all');
    this.nameFilter.set('');
    this.alterEgoFilter.set('');
    this.originatorFilter.set('');
  }

  clearAdvancedFilters(): void {
    this.nameFilter.set('');
    this.alterEgoFilter.set('');
    this.originatorFilter.set('');
  }

  toggleAdvancedFilters(): void {
    this.showAdvancedFilters.set(!this.showAdvancedFilters());
  }

  selectPublisher(publisher: EPublisher): void {
    this.selectedPublisher.set(
      this.selectedPublisher() === publisher ? 'all' : publisher,
    );
  }

  isPublisherSelected(publisher: string): boolean {
    return this.selectedPublisher() === publisher;
  }

  clickedCard(id: string) {
    this.router.navigate(['/heroes', id]);
  }
}
