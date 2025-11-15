import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatDividerModule } from '@angular/material/divider';
import { HeroCardComponent } from '../../components/hero-card/hero-card.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroes-list',
  imports: [HeroCardComponent, MatDividerModule],
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.css',
})
export class HeroesListComponent implements OnInit {
  heroes: Hero[] = [];
  heroes$: Observable<Hero[]> = new Observable<Hero[]>();
  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.getAllHeroes();
  }

  getAllHeroes() {
    this.heroesService.getHeroes().subscribe({
      next: (resp) => {
        if (resp.status === 200) {
          this.heroes = resp.body.heroes;
          this.saveHeroesInSession();
        }
      },
      error: (err) => console.error('Error Occured When Get All Heroes ' + err),
    });
  }

  saveHeroesInSession() {
    let heroesString = sessionStorage.getItem('heroes');
    if (heroesString === null) {
      sessionStorage.setItem('heroes', JSON.stringify(this.heroes));
    } else {
      let heroes: Hero[] = JSON.parse(heroesString);
      sessionStorage.setItem('heroes', JSON.stringify(heroes));
      this.heroes = heroes;
    }
  }
}
