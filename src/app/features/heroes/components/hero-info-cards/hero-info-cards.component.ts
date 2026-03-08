import { Component, input } from '@angular/core';
import { IHero } from '../../../../core/models/interfaces/hero.interface';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-hero-info-cards',
  imports: [MatIconModule],
  templateUrl: './hero-info-cards.component.html',
  styleUrl: './hero-info-cards.component.css',
})
export class HeroInfoCardsComponent {
  hero = input.required<IHero>();
}
