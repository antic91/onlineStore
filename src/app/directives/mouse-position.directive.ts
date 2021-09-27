import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[mousemoving]'
})
export class MousePositionDirective {
  @Input("max") max!:number;
  @Input("min") min!: number;
  @Input("maxShow") maxToShow!: number;
  @Output() newValueMin: any = new EventEmitter();
  @Output() newValueMStatus: any = new EventEmitter();

  status: boolean = false;
  minI: any = 0;
  startingPosition!: number;
  actualPosition!: number;
  two!: number;
  sendMin!: number;

  constructor(private el: ElementRef) { }
  ngOnInit(): void {
    this.two = ((this.max - this.min) / 100)*2 ;
    this.sendMin = this.min;
  }

    @HostListener('mousedown', ['$event'])
    onMouseDown(event: any) {
      this.status = true;
      this.newValueMStatus.emit(true)
    }

    @HostListener('document:mousemove', ['$event'])
    Move(event: any) {
      event.preventDefault();


      this.startingPosition = this.el.nativeElement.getBoundingClientRect().left;
      this.actualPosition = event.pageX;

      if (this.status) {
        if (this.startingPosition <= this.actualPosition + 15 && this.minI < 100) {

          if (this.sendMin >= this.maxToShow) {
            this.newValueMin.emit(this.maxToShow);
            return
          }
          this.minI = this.minI + 2;

          this.el.nativeElement.parentElement.style.width = (100-this.minI) + "%";
          this.el.nativeElement.parentElement.style.marginLeft = this.minI + "%";

          //SETTING NEW MIN VALUE
          this.sendMin += this.two;
          if (this.sendMin > this.max) {
            this.newValueMin.emit(this.max);
          } else {
            this.newValueMin.emit(this.sendMin);
          }
        }
        if (this.startingPosition > this.actualPosition - 15 && this.minI > 0) {

          this.minI = this.minI - 2;

          this.el.nativeElement.parentElement.style.width = (parseInt(this.el.nativeElement.parentElement.style.width) + 2) + "%";
          this.el.nativeElement.parentElement.style.marginLeft = this.minI + "%";

          //SETTING NEW MIN VALUE
          this.sendMin -= this.two;
          if (this.sendMin < this.min) {
            this.newValueMin.emit(this.min);
            this.sendMin = this.min
          } else {
            this.newValueMin.emit(this.sendMin);
          }
        }
      }
    }

    @HostListener('window:mouseup', ['$event'])
    onMouseUp(event: any) {
      this.status = false;
    }
}
