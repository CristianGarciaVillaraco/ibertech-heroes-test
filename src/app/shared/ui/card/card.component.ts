import { Component, input, output, signal } from '@angular/core';
import { CleanTextPipe } from '../../pipes/clean-text/clean-text.pipe';

@Component({
  selector: 'app-card',
  imports: [CleanTextPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  id = input.required<string>();
  imgBG = input.required<string>();
  imgHero = input<string>();
  imgFront = input<string>();
  title = input.required<string>();
  clicked = output();
  hasImageError = signal<Record<string, boolean>>({});

  isAnimating = false;

  imgNoExist(key: string) {
    this.hasImageError.update((errors) => ({
      ...errors,
      [key]: true,
    }));
  }

  hasError(key: string): boolean {
    return !!this.hasImageError()[key];
  }

  onCardClick() {
    if (this.isAnimating) return;

    this.isAnimating = true;

    setTimeout(() => {
      this.clicked.emit();
    }, 400);
  }
}
