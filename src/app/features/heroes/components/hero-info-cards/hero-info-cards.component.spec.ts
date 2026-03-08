import { EPublisher } from '../../../../core/models/enums/publisher.enum';
import { DEFAULT_POWER_STATS } from '../../../../core/models/interfaces/hero.interface';
const MOCK = { id: "dc-batman", key: "dc-batman", superhero: "Batman", publisher: EPublisher.DC, alterEgo: "Bruce Wayne", firstAppearance: "Detective Comics #27", characters: [], originators: ["Bob Kane"], description: "", powerStats: DEFAULT_POWER_STATS };
import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroInfoCardsComponent } from './hero-info-cards.component';

describe('HeroInfoCardsComponent', () => {
  let component: HeroInfoCardsComponent;
  let fixture: ComponentFixture<HeroInfoCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [HeroInfoCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroInfoCardsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("hero", MOCK);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
