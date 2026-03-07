import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-hero-stats',
  imports: [MatIconModule, MatChipsModule],
  templateUrl: './hero-stats.component.html',
  styleUrl: './hero-stats.component.css',
})
export class HeroStatsComponent {
  characters = input.required<string[]>();
  originators = input.required<string[]>();
}
