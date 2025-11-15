import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-dialog',
  templateUrl: './hero-dialog.component.html',
  styleUrls: ['./hero-dialog.ccomponent.scss']
})
export class HeroDialogComponent {

  charactersMap = {
    '=0': 'Ningun nombre',
    '=1': 'El unico nombre que a tenido es: ',
    'other': 'Los nombres que a tenido son: '
  };

  originatorsMap = {
    '=0': 'Ningun creador registrado',
    '=1': 'Creado por: ',
    'other': 'Los creadores han sido: '
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) public hero: Hero
   ) { }

}
