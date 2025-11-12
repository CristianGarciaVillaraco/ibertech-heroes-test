import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHeroesComponent } from './form-heroes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImagePipe } from '../../pipes/image.pipe';
import { HeroesService } from '../../services/heroes.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

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
    imports: [RouterTestingModule,
        MatSnackBarModule,
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();
  });
  FormHeroesComponent.prototype.ngOnInit = () => {};
  beforeEach(() => {
    fixture = TestBed.createComponent(FormHeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
