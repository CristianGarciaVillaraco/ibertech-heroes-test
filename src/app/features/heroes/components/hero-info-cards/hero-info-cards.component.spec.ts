import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroInfoCardsComponent } from './hero-info-cards.component';

describe('HeroInfoCardsComponent', () => {
  let component: HeroInfoCardsComponent;
  let fixture: ComponentFixture<HeroInfoCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroInfoCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroInfoCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
