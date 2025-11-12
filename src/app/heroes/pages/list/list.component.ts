import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  standalone: false,
})
export class ListComponent implements OnInit {
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
