import { Component, OnInit } from '@angular/core';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { ConfirmComponent } from '../../components/confirm/confirm.component';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ImagePipe } from '../../pipes/image/image.pipe';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-hero-form',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    ImagePipe,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.css',
})
export class HeroFormComponent implements OnInit {
  showLoading: boolean = false;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marver - Comics',
    },
  ];

  hero: Hero = {
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: [],
    originators: [],
    description: '',
    img_fa: '',
  };

  private reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  heroForm: FormGroup<any>;
  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private formBuilder: UntypedFormBuilder
  ) {
    this.heroForm = this.formBuilder.group({
      id: [''],
      superhero: [
        '',
        {
          validators: [Validators.required, Validators.maxLength(20)],
        },
      ],
      publisher: [Publisher.DCComics, Validators.required],
      alter_ego: [
        '',
        {
          validators: [Validators.required, Validators.maxLength(30)],
        },
      ],
      first_appearance: [
        '',
        {
          validators: [Validators.required, Validators.maxLength(30)],
        },
      ],
      characters: [[], Validators.required],
      originators: ['', Validators.required],
      description: ['', Validators.required],
      alt_img: ['', Validators.pattern(this.reg)],
      alt_img_fa: ['', Validators.pattern(this.reg)],
    });
  }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) {
      return;
    }
    this.showLoading = true;
    this.activatedRoute.params.subscribe(
      (params) => {
        this.hero = this.heroesService.getHeroForId(params['id']);
        this.loadForm(this.hero);
      },
      (err: string) =>
        console.error('Error Occured When search hero for id ' + err),
      () => (this.showLoading = false)
    );
  }

  save() {
    if (!this.heroForm.valid) {
      this.showSnakbar('Formulario invalido');
      return;
    }

    if (this.hero.id) {
      let heroes: Hero[] = this.heroesService.checkHeroesSessionStorage();
      heroes.find((hero, i) => {
        if (hero.id === this.hero.id) {
          heroes[i] = this.heroForm.value;
        }
      });
      sessionStorage.setItem('heroes', JSON.stringify(heroes));
      this.showSnakbar('Registro actualizado');
    } else {
      this.showLoading = true;
      this.heroesService.addHero(this.heroForm.value).subscribe((resp) => {
        let heroes: Hero[] = this.heroesService.checkHeroesSessionStorage();
        if (resp.status == 200) {
          heroes.push(resp.body);
          this.hero = resp.body;
          sessionStorage.setItem('heroes', JSON.stringify(heroes));
          this.router.navigate(['/heroes/edit', this.hero.id]);
          this.showSnakbar('Registro creado');
        }
      }),
        (err: string) =>
          console.error('Error Occured When Add A New Heroe ' + err),
        () => (this.showLoading = false);
    }
  }

  deletedHero() {
    this.showLoading = true;
    const dialog = this.dialog.open(ConfirmComponent, {
      width: '250px',
      data: this.hero,
      panelClass: 'custom-dialog',
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.heroesService.deleteHero(this.hero.id!).subscribe(
          (resp) => {
            if (resp.status == 200) {
              const id = resp.body;
              let heroes: Hero[] =
                this.heroesService.checkHeroesSessionStorage();
              heroes = heroes.filter((hero) => hero.id !== id);
              sessionStorage.setItem('heroes', JSON.stringify(heroes));
              this.router.navigate(['/heroes/list']);
            }
          },
          (err) => console.error('Error Occured When Delete An hero ' + err),
          () => (this.showLoading = false)
        );
      }
    });
  }

  showSnakbar(message: string) {
    this.snackBar.open(message, 'ok!', {
      duration: 2500,
    });
  }

  loadForm(hero: Hero): void {
    this.heroForm = this.formBuilder.group({
      id: [hero.id],
      img_fa: [this.hero.img_fa],
      isAssetsImg: [this.hero.isAssetsImg],
      superhero: [
        hero.superhero,
        {
          validators: [Validators.required, Validators.maxLength(20)],
        },
      ],
      publisher: [hero.publisher, Validators.required],
      alter_ego: [
        hero.alter_ego,
        {
          validators: [Validators.required, Validators.maxLength(30)],
        },
      ],
      first_appearance: [
        hero.first_appearance,
        {
          validators: [Validators.required, Validators.maxLength(30)],
        },
      ],
      characters: [hero.characters ? hero.characters : [], Validators.required],
      originators: [
        hero.originators ? hero.originators : [],
        Validators.required,
      ],
      description: [hero.description, Validators.required],
      alt_img: [hero.alt_img, Validators.pattern(this.reg)],
      alt_img_fa: [hero.alt_img_fa, Validators.pattern(this.reg)],
    });
  }

  add(event: MatChipInputEvent, attribute: string): void {
    const value = (event.value || '').trim();
    if (value) {
      this.heroForm.controls[attribute].setValue([
        ...this.heroForm.controls[attribute].value,
        value.trim(),
      ]);
      this.heroForm.controls[attribute].updateValueAndValidity();
    }

    event.chipInput!.clear();
  }

  remove(value: string, attribute: string): void {
    const index = this.heroForm.controls[attribute].value.indexOf(value);

    if (index >= 0) {
      this.heroForm.controls[attribute].value.splice(index, 1);
      this.heroForm.controls[attribute].updateValueAndValidity();
    }
  }
}
