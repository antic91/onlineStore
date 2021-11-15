import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollPrevDef]'
})
export class ScrollPrevDefDirective {

  constructor() { }

  /*on scroll prevent default*/
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    event.preventDefault()
  }

}
