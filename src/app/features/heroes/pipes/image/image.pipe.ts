import { Pipe, PipeTransform } from '@angular/core';
import { IHero } from '../../../../core/models/hero.model';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(value: IHero, isFA: boolean) {
    if (isFA) {
      return value.img_fa ? `heroes/${value.img_fa}` : 'no-image.jpg';
    } else {
      return value.img ? `heroes/${value.img}` : 'no-image.jpg';
    }
  }
}
