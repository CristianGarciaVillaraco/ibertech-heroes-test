import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EPublisher } from '../../../../core/models/enums/publisher.enum';
import { HeroesService } from '../../services/heroes/heroes.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { HeroModel } from '../../../../core/models/class/hero.class';
import { DEFAULT_POWER_STATS, IHero, IPowerStats } from '../../../../core/models/interfaces/hero.interface';

@Component({
  selector: 'app-hero-form',
  imports: [
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.css',
})
export class HeroFormComponent implements OnInit {
  readonly charactersKeywords = signal<string[]>([]);
  readonly originatorsKeywords = signal<string[]>([]);

  powerStats: IPowerStats = { ...DEFAULT_POWER_STATS };

  readonly statLabels: { key: keyof IPowerStats; label: string; icon: string }[] = [
    { key: 'intelligence', label: 'Inteligencia', icon: 'psychology' },
    { key: 'strength',     label: 'Fuerza',       icon: 'fitness_center' },
    { key: 'speed',        label: 'Velocidad',    icon: 'speed' },
    { key: 'durability',   label: 'Durabilidad',  icon: 'shield' },
    { key: 'combat',       label: 'Combate',      icon: 'sports_martial_arts' },
    { key: 'power',        label: 'Poder',        icon: 'bolt' },
  ];

  heroForm: FormGroup;

  publishers = Object.entries(EPublisher).map(([key, value]) => ({
    id: key,
    label: value,
  }));

  editing = false;
  heroId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private heroesService: HeroesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.heroForm = this.fb.group({
      superhero: ['', [Validators.required, Validators.maxLength(20)]],
      publisher: ['DC', Validators.required],
      alterEgo: ['', Validators.required],
      firstAppearance: ['', Validators.required],
      description: [''],
      img: [''],
      imgFa: [''],
    });
  }

  ngOnInit(): void {
    this.heroId = this.route.snapshot.paramMap.get('id');
    if (this.heroId) {
      this.editing = true;
      this.heroesService.getHeroById(this.heroId).subscribe((hero) => {
        if (hero) {
          const publisherKey = Object.entries(EPublisher).find(([, val]) => val === hero.publisher)?.[0] ?? 'DC';
          this.heroForm.patchValue({
            superhero: hero.superhero,
            publisher: publisherKey,
            alterEgo: hero.alterEgo,
            firstAppearance: hero.firstAppearance,
            description: hero.description,
            img: hero.fileManager?.imgHero ?? '',
            imgFa: hero.fileManager?.imgFA ?? '',
          });
          this.charactersKeywords.set(hero.characters);
          this.originatorsKeywords.set(hero.originators);
          if (hero.powerStats) {
            this.powerStats = { ...hero.powerStats };
          }
        }
      });
    }
  }

  generateId(): string {
    const publisher: string = this.heroForm.value.publisher;
    const superhero: string = this.heroForm.value.superhero;
    const pub = publisher.replace('_', '-').toLowerCase();
    return `${pub}-${superhero.toLowerCase().replace(/\s+/g, '-')}`;
  }

  onSubmit() {
    if (this.heroForm.valid && this.originatorsKeywords().length > 0) {
      const id = this.editing ? this.heroId! : this.generateId();
      const hero: IHero = new HeroModel({
        ...this.heroForm.value,
        id,
        key: id,
        characters: this.charactersKeywords(),
        originators: this.originatorsKeywords(),
        powerStats: { ...this.powerStats },
      });
      this.save(hero);
    }
  }

  save(hero: IHero) {
    if (this.editing) {
      this.heroesService.update(hero.id, hero).subscribe(() => {
        this.router.navigate(['/heroes', hero.id]);
      });
    } else {
      this.heroesService.add(hero).subscribe(() => {
        this.router.navigate(['/heroes/list']);
      });
    }
  }

  addChip(event: MatChipInputEvent, type: string): void {
    const value = (event.value || '').trim();
    if (value) {
      if (type === 'character' && !this.charactersKeywords().includes(value)) {
        this.charactersKeywords.update((kw) => [...kw, value]);
      } else if (type === 'originator' && !this.originatorsKeywords().includes(value)) {
        this.originatorsKeywords.update((kw) => [...kw, value]);
      }
    }
    event.chipInput!.clear();
  }

  removeChip(keyword: string, type: string) {
    if (type === 'character') {
      this.charactersKeywords.update((kw) => kw.filter((k) => k !== keyword));
    } else if (type === 'originator') {
      this.originatorsKeywords.update((kw) => kw.filter((k) => k !== keyword));
    }
  }
}
