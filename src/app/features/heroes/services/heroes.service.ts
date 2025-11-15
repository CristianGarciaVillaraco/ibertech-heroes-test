import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, retry, throwError } from 'rxjs';
import { Hero, Publisher } from '../interfaces/hero.interface';
import enviroment from '../../../config/config.json';

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

  result: Hero = {
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: [],
    originators: [],
    description: '',
  };
  constructor(private http: HttpClient) {}

  getHeroes(): Observable<any> {
    return this.http
      .get<any>(`${this.apiUrl}/heroes`, { observe: 'response' })
      .pipe(retry(3), catchError(this.handleError));
  }

  getSuggestions(term: string): Observable<Hero[]> {
    let heroes: Hero[] = this.checkHeroesSessionStorage();
    let results: Hero[] = [];
    heroes.find((hero) => {
      if (term && hero.superhero.toLowerCase().includes(term.toLowerCase())) {
        results.push(hero);
      }
    });
    return of(results);
  }

  addHero(hero: Hero): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/heroes`, hero, {
        observe: 'response',
      })
      .pipe(catchError(this.handleError));
  }

  deleteHero(id: string): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/heroes/${id}`, {
        observe: 'response',
      })
      .pipe(catchError(this.handleError));
  }

  getHeroForId(id: string): Hero {
    let heroes: Hero[] = this.checkHeroesSessionStorage();
    let validResult = heroes.find((hero) => hero.id === id);
    if (validResult) {
      this.result = validResult;
    }

    return this.result;
  }

  checkHeroesSessionStorage(): Hero[] {
    const heroesJson = sessionStorage.getItem('heroes');
    return heroesJson !== null ? JSON.parse(heroesJson) : [];
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
