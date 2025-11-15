import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Hero } from '../../interfaces/hero.interface';
import { HeroDialogComponent } from '../hero-dialog/hero-dialog.component';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss']
})
export class HeroesCardComponent{
  @Input() hero!: Hero;
  charactersMap = {
    '=0': 'Ningun nombre',
    '=1': 'Personaje: ',
    'other': 'Personajes: '
  };
  constructor(private dialog: MatDialog) { }
  viewHero() {
    const dialog = this.dialog.open(HeroDialogComponent, {
      data: this.hero,
      panelClass: 'custom-dialog'
    });
    dialog.afterClosed();
  };

};
