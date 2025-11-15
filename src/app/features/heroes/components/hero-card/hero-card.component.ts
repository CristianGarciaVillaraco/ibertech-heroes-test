import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Hero } from '../../interfaces/hero.interface';
import { HeroDialogComponent } from '../hero-dialog/hero-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { AscendingOrderPipe } from '../../pipes/ascending-order/ascending-order.pipe';
import { ImagePipe } from '../../pipes/image/image.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-card',
  imports: [
    AscendingOrderPipe,
    CommonModule,
    ImagePipe,
    MatButtonModule,
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './hero-card.component.html',
  styleUrl: './hero-card.component.css',
})
export class HeroCardComponent {
  @Input() hero!: Hero;
  charactersMap = {
    '=0': 'Ningun nombre',
    '=1': 'Personaje: ',
    other: 'Personajes: ',
  };
  constructor(private dialog: MatDialog) {}
  viewHero() {
    const dialog = this.dialog.open(HeroDialogComponent, {
      data: this.hero,
      panelClass: 'custom-dialog',
    });
    dialog.afterClosed();
  }
}
