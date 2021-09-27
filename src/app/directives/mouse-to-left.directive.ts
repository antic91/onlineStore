import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appmousetoleft]'
})
export class MouseToLeftDirective {
  @Input("maxx") max!:number;
  @Input("minn") min!: number;
  @Input("minShow") minShow!: number;
  @Output() newValueMax: any = new EventEmitter();
  @Output() ValueStatusMax: any = new EventEmitter();

  status: boolean = false;
  i: any = 0;
  startingPosition!: number;
  actualPosition!: number;
  oneHalf!: number;
  sendMax!: number;

  constructor(private el: ElementRef) { }
  ngOnInit(): void {
    this.oneHalf = ((this.max - this.min) / 100) * 2;
    this.sendMax = this.max;
  }

    @HostListener('mousedown', ['$event'])
    onMouseDown(event: any) {
      this.status = true
      this.el.nativeElement.style.zIndex = 1;
      this.ValueStatusMax.emit(true)
    }

    @HostListener('document:mousemove', ['$event'])
    Move(event: any) {
      event.preventDefault();

      this.startingPosition = this.el.nativeElement.getBoundingClientRect().right;
      this.actualPosition = event.pageX;

      if (this.status) {

        if (this.startingPosition >= this.actualPosition && this.i < 100) {


          if (this.minShow >= this.sendMax) {
            this.newValueMax.emit(this.minShow);
            return
          }
          this.i = this.i + 2;

          this.el.nativeElement.parentElement.style.width = (100 - this.i) + "%";
          this.el.nativeElement.parentElement.style.marginRight = this.i + "%";

          //SETTING NEW MAX VALUE
          this.sendMax -= this.oneHalf;
          if (this.sendMax < this.min) {
            this.newValueMax.emit(this.min);
          } else {
            this.newValueMax.emit(this.sendMax);
          }
        }
        if (this.startingPosition < this.actualPosition && this.i > 0) {

          this.i = this.i - 2;
          this.el.nativeElement.parentElement.style.width = parseInt(this.el.nativeElement.parentElement.style.width) + 2 + "%";
          this.el.nativeElement.parentElement.style.marginRight = this.i + "%";
          //SETTING NEW MAX VALUE
          this.sendMax += this.oneHalf;
          if (this.sendMax > this.max) {
            this.newValueMax.emit(this.max);
          } else {
            this.newValueMax.emit(this.sendMax);
          }
        }
      }
    }

    @HostListener('window:mouseup', ['$event'])
    onMouseUp(event: any) {
      this.status = false;
      this.el.nativeElement.style.zIndex = 0;
    }

}
