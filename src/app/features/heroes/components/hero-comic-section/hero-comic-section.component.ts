import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-hero-comic-section',
  imports: [MatIconModule],
  templateUrl: './hero-comic-section.component.html',
  styleUrl: './hero-comic-section.component.css',
})
export class HeroComicSectionComponent {
  firstAppearance = input.required<string>();
}
