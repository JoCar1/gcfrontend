import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shuffle'
})
export class ShufflePipe implements PipeTransform {

  // transform(value: any, args?: any): any {
  //   return null;
  // }
  transform(value: any): any {
    // if (!value) return ''
    return this.rand(value);
  }
  // private randomize(a, b) {
  // 	return Math.random()>.5 ? -1 : 1;
  // }
  private rand(array){
    var m = array.length, t, i;
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }
}
