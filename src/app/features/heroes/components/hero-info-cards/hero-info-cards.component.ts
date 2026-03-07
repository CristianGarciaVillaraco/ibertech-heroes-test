import { Component, input } from '@angular/core';
import { IHero } from '../../../../core/models/interfaces/hero.interface';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-hero-info-cards',
  imports: [CommonModule, MatIconModule],
  templateUrl: './hero-info-cards.component.html',
  styleUrl: './hero-info-cards.component.css',
})
export class HeroInfoCardsComponent {
  hero = input.required<IHero>();
}
