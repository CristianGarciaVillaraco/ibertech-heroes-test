import { Component, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

interface WikiSummary {
  title: string;
  extract: string;
  thumbnail?: { source: string };
  content_urls?: { desktop: { page: string } };
}

@Component({
  selector: 'app-hero-stats',
  imports: [MatIconModule, MatChipsModule],
  templateUrl: './hero-stats.component.html',
  styleUrl: './hero-stats.component.css',
})
export class HeroStatsComponent {
  characters = input.required<string[]>();
  originators = input.required<string[]>();

  hoveredCreator = signal<string | null>(null);
  wikiData = signal<WikiSummary | null>(null);
  wikiLoading = signal(false);
  wikiError = signal(false);

  async onCreatorHover(name: string): Promise<void> {
    this.hoveredCreator.set(name);
    this.wikiData.set(null);
    this.wikiLoading.set(true);
    this.wikiError.set(false);
    try {
      const encoded = encodeURIComponent(name.replace(/ /g, '_'));
      const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`);
      if (!res.ok) throw new Error();
      const data: WikiSummary = await res.json();
      if (this.hoveredCreator() !== name) return;
      const normalize = (s: string) => s.toLowerCase().trim();
      const matched =
        normalize(data.title).includes(normalize(name)) ||
        normalize(name).includes(normalize(data.title));
      if (matched) {
        this.wikiData.set(data);
      } else {
        this.wikiError.set(true);
      }
    } catch {
      if (this.hoveredCreator() === name) {
        this.wikiError.set(true);
      }
    } finally {
      if (this.hoveredCreator() === name) {
        this.wikiLoading.set(false);
      }
    }
  }

  onCreatorLeave(): void {
    this.hoveredCreator.set(null);
    this.wikiData.set(null);
    this.wikiError.set(false);
  }
}
