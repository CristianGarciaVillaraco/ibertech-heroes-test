import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHeroesComponent } from './form-heroes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImagePipe } from '../../pipes/image.pipe';
import { HeroesService } from '../../services/heroes.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

describe('FormHeroesComponent', () => {
  let component: FormHeroesComponent;
  let fixture: ComponentFixture<FormHeroesComponent>;
  let heroesSpy: jasmine.SpyObj<HeroesService>;

  beforeEach(async () => {
    heroesSpy = jasmine.createSpyObj<HeroesService>('HeroesService', [
      'checkHeroesSessionStorage',
      'addHero',
    ]);
    await TestBed.configureTestingModule({
      declarations: [FormHeroesComponent, ImagePipe],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule,
      ],
    }).compileComponents();
  });
  FormHeroesComponent.prototype.ngOnInit = () => {};
  beforeEach(() => {
    fixture = TestBed.createComponent(FormHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
