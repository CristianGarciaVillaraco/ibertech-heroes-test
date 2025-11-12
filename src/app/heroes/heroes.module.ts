import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ListComponent } from './pages/list/list.component';
import { HomeComponent } from './pages/home/home.component';
import { HeroesCardComponent } from './components/heroes-card/hero-card.component';
import { ImagePipe } from './pipes/image.pipe';
import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroDialogComponent } from './components/hero-dialog/hero-dialog.component';
import { AscendingOrderPipe } from './pipes/ascending-order.pipe';
import { SearchComponent } from './pages/search/search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormHeroesComponent } from './pages/form-heroes/form-heroes.component';
import { ConfirmComponent } from './components/confirm/confirm.component';

@NgModule({
  declarations: [
    HomeComponent,
    ListComponent,
    SearchComponent,
    HeroesCardComponent,
    HeroDialogComponent,
    AscendingOrderPipe,
    ImagePipe,
    FormHeroesComponent,
    ConfirmComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HeroesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class HeroesModule {}
