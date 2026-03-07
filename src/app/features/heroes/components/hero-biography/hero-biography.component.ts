import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-hero-biography',
  imports: [MatIconModule],
  templateUrl: './hero-biography.component.html',
  styleUrl: './hero-biography.component.css',
})
export class HeroBiographyComponent {
  description = input.required<string>();
}
