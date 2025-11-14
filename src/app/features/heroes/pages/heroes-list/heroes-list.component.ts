import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatDividerModule } from '@angular/material/divider';
import { HeroCardComponent } from '../../components/hero-card/hero-card.component';

@Component({
  selector: 'app-heroes-list',
  imports: [HeroCardComponent, MatDividerModule],
  templateUrl: './heroes-list.component.html',
  styleUrl: './heroes-list.component.css',
})
export class HeroesListComponent implements OnInit {
  heroes: Hero[] = [];
  showLoading: boolean = false;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.getAllHeroes();
  }

  getAllHeroes() {
    this.showLoading = true;
    this.heroesService.getHeroes().subscribe(
      (resp) => {
        if (resp.status === 200) {
          this.heroes = resp.body.heroes;
          this.saveHeroesInSession();
        }
      },
      (err) => console.error('Error Occured When Get All Heroes ' + err),
      () => (this.showLoading = false)
    );
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
