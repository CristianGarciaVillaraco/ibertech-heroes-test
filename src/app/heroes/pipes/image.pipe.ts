import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {
  transform(value: Hero, isFA: boolean) {
    switch (isFA) {
      case true:
        if(value.alt_img_fa) {          
          return value.alt_img_fa
        } else if(value.img_fa && value.isAssetsImg) {
          return `assets/heroes/${value.img_fa}.jpg`;
        };
        break;
      case false:
        if(value.alt_img) {
          return value.alt_img;
        } else if(value.id && value.isAssetsImg){
          return `assets/heroes/${value.id}.jpg`;
        };
        break;
      default:
        return `assets/no-image.png`;
    };
    return `assets/no-image.png`;
  };
};