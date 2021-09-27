import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundingNumbers'
})
export class RoundingNumbersPipe implements PipeTransform {

  transform(value: number, args: string[]): any {
    if (args != ["Display size"]) {
      return Math.floor(value)
    } else {
      return value.toFixed(1)
    }
  }

}
