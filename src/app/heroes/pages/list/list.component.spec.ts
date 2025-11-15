import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { HeroesService } from '../../services/heroes.service';
import { allHeroes } from '../../services/heroesServiceTestsData';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let heroesSpy: jasmine.SpyObj<HeroesService>;

  beforeEach(async () => {
    heroesSpy = jasmine.createSpyObj<HeroesService>('HeroesService', ['getHeroes']);

    await TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [
        { provide: HeroesService, useValue: heroesSpy },
      ]
    })
    .compileComponents();
  });

  ListComponent.prototype.ngOnInit = () => {} ;
  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should bew creted correcly', () => {
    expect(component).toBeTruthy();
  });

  it('Should get all heroes', () => {
    let resp = {
      status: 200,
      body: {
        heroes: allHeroes
      }
    }
    heroesSpy.getHeroes.and.returnValues(of(resp));
    component.getAllHeroes();    
    expect(component.heroes.length).toBe(18);

    sessionStorage.setItem('heroes', JSON.stringify(allHeroes));
    heroesSpy.getHeroes.and.returnValues(of(resp));
    component.getAllHeroes();    
    expect(component.heroes.length).toBe(18);
  });
});
