import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import {
  allHeroes,
  batmanHeroInList,
  batmanHeroObject,
} from '../../services/heroesServiceTestsData';

import { SearchComponent } from './search.component';
import { HeroesService } from '../../services/heroes.service';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let heroesSpy: jasmine.SpyObj<HeroesService>;

  beforeEach(async () => {
    heroesSpy = jasmine.createSpyObj<HeroesService>('HeroesService', [
      'getSuggestions',
      'getHeroForId',
    ]);

    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [HttpClientTestingModule, MatAutocompleteModule],
      providers: [{ provide: HeroesService, useValue: heroesSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    sessionStorage.setItem('heroes', JSON.stringify(allHeroes));
  });

  it('Should bew creted correcly', () => {
    expect(component).toBeTruthy();
  });

  it('Should show the result of the autocomplete', () => {
    heroesSpy.getSuggestions.and.returnValues(of(batmanHeroInList));
    component.searching();
    expect(component.heroes.length).toBe(1);
  });

  it('Should show the result hero or undefined', () => {
    const event: MatAutocompleteSelectedEvent = {
      option: {
        value: 'batman',
      },
    } as MatAutocompleteSelectedEvent;
    heroesSpy.getHeroForId.and.callFake(() => batmanHeroObject);
    component.selectedOption(event);
    expect(component.selectedHero).toEqual(batmanHeroObject);

    event.option.value = '';
    component.selectedOption(event);
    expect(component.selectedHero).toBeUndefined();
  });
});
