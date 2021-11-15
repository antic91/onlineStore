import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollPrevDef]'
})
export class ScrollPrevDefDirective {

  constructor(private el: ElementRef) { }

  /*on scroll prevent default and disable button...mobile devices on scroll problem.*/
  @HostListener('window:touchstart', ['$event'])
  onScroll(event: any) {
    //event.preventDefault();
    //event.stopPropagation();
    //this.el.nativeElement.disabled= true

    //console.log(event)
  }



}
