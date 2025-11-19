import { Component } from '@angular/core';
import { HeroesService } from '../../services/heroes/heroes.service';
import { IHero } from '../../../../core/models/hero.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-heroes-list',
  imports: [CommonModule, MatDivider],
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.css',
})
export class HeroesListComponent {
  heroes$: Observable<IHero[]>;
  constructor(private heroService: HeroesService) {
    this.heroes$ = this.heroService.getAll();
  }
}
