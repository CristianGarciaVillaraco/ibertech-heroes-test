import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hero } from '../../interfaces/hero.interface';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { AscendingOrderPipe } from '../../pipes/ascending-order/ascending-order.pipe';
import { CommonModule } from '@angular/common';
import { ImagePipe } from '../../pipes/image/image.pipe';

@Component({
  selector: 'app-hero-dialog',
  imports: [
    AscendingOrderPipe,
    CommonModule,
    ImagePipe,
    MatDividerModule,
    MatGridListModule,
    MatListModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './hero-dialog.component.html',
  styleUrl: './hero-dialog.component.css',
})
export class HeroDialogComponent {
  charactersMap = {
    '=0': 'Ningun nombre',
    '=1': 'El unico nombre que a tenido es: ',
    other: 'Los nombres que a tenido son: ',
  };

  originatorsMap = {
    '=0': 'Ningun creador registrado',
    '=1': 'Creado por: ',
    other: 'Los creadores han sido: ',
  };
  constructor(@Inject(MAT_DIALOG_DATA) public hero: Hero) {}
}
