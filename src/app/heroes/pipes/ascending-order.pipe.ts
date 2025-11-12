import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ascendingOrder',
    standalone: false
})
export class AscendingOrderPipe implements PipeTransform {

  transform(value: Array<string>): string {
    let valueOrder = value.sort();    
    return valueOrder.toString().trim().replace(/,/g, ', ');
  }

}
