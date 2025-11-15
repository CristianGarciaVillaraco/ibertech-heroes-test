import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  term: string = '';
  heroes: Hero[] = [];
  selectedHero!: Hero | undefined;
  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {};

  searching() {    
    this.heroesService.getSuggestions(this.term)
    .subscribe(heroes => this.heroes = heroes)
  };

  selectedOption(event: MatAutocompleteSelectedEvent) {
    if(!event.option.value){
      this.selectedHero = undefined;
      return;
    }
    const hero: Hero = event.option.value;
    this.term = hero.superhero;
    this. selectedHero = this.heroesService.getHeroForId(hero.id!);
  };
}
