import { Component } from '@angular/core';
import { HeroesService } from '../../services/heroes/heroes.service';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { HeroCardComponent } from '../../components/hero-card/hero-card.component';
import { CommonModule } from '@angular/common';
import { IHero } from '../../../../core/models/hero.model';

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
  heroes: IHero[] = [];
  selectedHero!: IHero | undefined;
  constructor(private heroesService: HeroesService) {}

  searching() {}

  selectedOption(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.selectedHero = undefined;
      return;
    }
    const hero: IHero = event.option.value;
    this.term = hero.superhero;
    // this.selectedHero = this.heroesService.getHeroForId(hero.id!);
  }
}
