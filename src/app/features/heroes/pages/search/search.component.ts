import { Component } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { HeroCardComponent } from '../../components/hero-card/hero-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [
    CommonModule,
    FormsModule,
    HeroCardComponent,
    MatAutocompleteModule,
    MatDividerModule,
    MatFormFieldModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  term: string = '';
  heroes: Hero[] = [];
  selectedHero!: Hero | undefined;
  constructor(private heroesService: HeroesService) {}

  searching() {
    this.heroesService
      .getSuggestions(this.term)
      .subscribe((heroes) => (this.heroes = heroes));
  }

  selectedOption(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }
    const hero: Hero = event.option.value;
    this.term = hero.superhero;
    this.selectedHero = this.heroesService.getHeroForId(hero.id!);
  }
}
