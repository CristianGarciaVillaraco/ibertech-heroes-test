import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  standalone: false,
})
export class SearchComponent implements OnInit {
  term: string = '';
  heroes: Hero[] = [];
  selectedHero!: Hero | undefined;
  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {}

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
