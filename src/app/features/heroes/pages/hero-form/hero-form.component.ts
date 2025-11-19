import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HeroModel, IHero } from '../../../../core/models/hero.model';
import { Publisher } from '../../../../shared/enums/publisher.enum';
import { HeroesService } from '../../services/heroes/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hero-form',
  imports: [ReactiveFormsModule],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.css',
})
export class HeroFormComponent implements OnInit {
  heroForm: FormGroup;
  publishers = Object.entries(Publisher).map(([key, value]) => ({
    id: key,
    label: value,
  }));

  editing = false;
  heroId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private heroesService: HeroesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.heroForm = this.fb.group({
      superhero: ['', Validators.required],
      publisher: ['DC', Validators.required],
      alter_ego: ['', Validators.required],
      first_appearance: ['', Validators.required],
      characters: this.fb.array([]),
      originators: this.fb.array([]),
      description: [''],
      img: [''],
      img_fa: [''],
    });
  }

  ngOnInit(): void {
    this.heroId = this.route.snapshot.paramMap.get('id');
    if (this.heroId) {
      this.editing = true;
      this.heroesService.getById(this.heroId).subscribe((hero) => {
        if (hero) {
          this.heroForm.patchValue({
            superhero: hero.superhero,
            publisher: hero.publisher,
            alter_ego: hero.alter_ego,
            first_appearance: hero.first_appearance,
            description: hero.description,
            img: hero.img,
            img_fa: hero.img_fa,
          });
          hero.characters.forEach((c) =>
            this.characters.push(this.fb.control(c))
          );
          hero.originators.forEach((o) =>
            this.originators.push(this.fb.control(o))
          );
        }
      });
    }
  }

  // Helpers para arrays
  get characters(): FormArray {
    return this.heroForm.get('characters') as FormArray;
  }

  get originators(): FormArray {
    return this.heroForm.get('originators') as FormArray;
  }

  addCharacter(name: string) {
    if (name) this.characters.push(this.fb.control(name));
  }

  addOriginator(name: string) {
    if (name) this.originators.push(this.fb.control(name));
  }

  // Generar ID según reglas
  generateId(): string {
    const publisher: string = this.heroForm.value.publisher;
    const superhero: string = this.heroForm.value.superhero;
    const pub = publisher.replace('_', '-').toLowerCase();
    return `${pub}-${superhero.toLowerCase().replace(/\s+/g, '-')}`;
  }

  onSubmit() {
    if (this.heroForm.valid) {
      const hero: IHero = new HeroModel({
        ...this.heroForm.value,
        id: this.generateId(),
      });
      this.save(hero);
    }
  }

  save(hero: IHero) {
    if (this.editing) {
      this.heroesService.update(hero.id, hero).subscribe(() => {
        this.router.navigate(['/heroes/list']);
      });
    } else {
      this.heroesService.add(hero).subscribe(() => {
        this.router.navigate(['/heroes/list']);
      });
    }
  }
}
