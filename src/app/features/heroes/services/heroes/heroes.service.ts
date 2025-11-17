import { Injectable } from '@angular/core';
import enviroment from '../../../../config/config.json';
import { HeroModel, IHero } from '../../../../core/models/hero.model';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  apiUrl = enviroment.apiUrl;
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marver - Comics',
    },
  ];

  result: IHero = new HeroModel();
}
