import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeroesService } from './heroes.service';
import { allHeroes, batmanHeroInList, batmanHeroObject } from './heroesServiceTestsData';
import { Hero, Publisher } from '../interfaces/hero.interface';

describe('ServicesService', () => {
  let httpTestingController: HttpTestingController;
  let service: HeroesService;
  let baseUrl = 'http://localhost:4200/heroes';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(HeroesService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('Should bew creted correcly', ()=> {
    expect(service).toBeTruthy();
  });

  describe('Testing the tests that call the backend', () =>{
    it('#getHeroes should return expected data', async()=> {
      service.getHeroes().subscribe((resp) => {
        expect(resp.body).toEqual(allHeroes);
      });
      const req = httpTestingController.expectOne({
        method: 'GET',
        url: baseUrl
      });
  
      req.flush(allHeroes);
    });
  
    it('#addHero should return expected data', async()=> {
      let hero: Hero = {
        id: "dc-batman",
        superhero: "Batman",
        publisher: Publisher.DCComics,
        alter_ego: "Bruce Wayne",
        first_appearance: "Detective Comics #27",
        img_fa: "dc-batman_fa",
        characters: ["Bruce Wayne"],
        originators: ["Bob Kane", "Bill Finger"],
        isAssetsImg: true,
        description: "Un multimillonario empresarial dueño de las empresas Wayne en Gotham City. Decide convertirse en un héroe después de presenciar el trágico asesinato de sus padres."
      };
      service.addHero(hero).subscribe((resp) => {
        expect(resp.body).toEqual(hero);
      });
      const req = httpTestingController.expectOne({
        method: 'POST',
        url: baseUrl
      });
  
      req.flush(hero);
    });
  
    it('#deleteHero should return expected data', async()=> {
      service.deleteHero('dc-batman').subscribe((resp) => {
        expect(resp.body).toEqual('dc-batman');
      });
      const req = httpTestingController.expectOne({
        method: 'DELETE',
        url: baseUrl + '/dc-batman',
      });
  
      req.flush('dc-batman');
    });
  });

  describe('Testing the checkHeroesSessionStorage method', () => {
    it('#checkHeroesSessionStorage should return expected data', async()=> {
      sessionStorage.setItem('heroes', JSON.stringify(allHeroes));
      let heroes: Hero[] = service.checkHeroesSessionStorage();
      expect(heroes).toEqual(allHeroes);
      sessionStorage.clear();
    });
  
    it('#checkHeroesSessionStorage should return null', async()=> {
      let heroes: Hero[] = service.checkHeroesSessionStorage();
      expect(heroes).toBeNull();
    });
  });

  it('#getSuggestions should return expected data', async()=> {
    sessionStorage.setItem('heroes', JSON.stringify(allHeroes));
    service.getSuggestions('batman').subscribe(heroes => {
      expect(heroes).toEqual(batmanHeroInList);
      sessionStorage.clear();
    }
    );
  });

  it('#getHeroForId should return expected data', async()=> {
    sessionStorage.setItem('heroes', JSON.stringify(allHeroes));
    let hero: Hero = service.getHeroForId('dc-batman');
    expect(hero).toEqual(batmanHeroObject);
    sessionStorage.clear();
  });
});


