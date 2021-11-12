import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appmousetoleft]'
})
export class MouseToLeftDirective {

  /*Getting values*/
  @Input("maxx") max!:number;
  @Input("minn") min!: number;
  @Input("minShow") minShow!: number;

  /*Emitters*/
  @Output() newValueMax: any = new EventEmitter();
  @Output() ValueStatusMax: any = new EventEmitter();

  /*Clicked status*/
  status: boolean = false;

  /*Value to play with width*/
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
  /*Mousedown event*/
    @HostListener('mousedown', ['$event'])
    onMouseDown(event: any) {
      this.status = true
      this.el.nativeElement.style.zIndex = 1;
      this.ValueStatusMax.emit(true)
    }

    /*Mousemove event*/
    @HostListener('document:mousemove', ['$event'])
    Move(event: any) {

      event.preventDefault();

      this.startingPosition = this.el.nativeElement.getBoundingClientRect().right;
      this.actualPosition = event.pageX;

      /*If mouse is down*/
      if (this.status) {

        /*If starting position is bigger then actual position and i is <100*/
        if (this.startingPosition >= this.actualPosition && this.i < 100) {

            /*If minShow is bigger or eq then sendMax emit new value minValue...*/
            if (this.minShow >= this.sendMax) {
              this.newValueMax.emit(this.minShow);
              return
            }
            /*else change element width and margin in %*/
            this.i = this.i + 2;

            this.el.nativeElement.parentElement.style.width = (100 - this.i) + "%";
            this.el.nativeElement.parentElement.style.marginRight = this.i + "%";


            //SETTING NEW MAX VALUE
            this.sendMax -= this.oneHalf;
            if (this.sendMax < this.min) {
              this.newValueMax.emit(this.min);
            }
            else {
              this.newValueMax.emit(this.sendMax);
            }
        }

        /*If starting position is smaller then actual position and i is >0*/
        if (this.startingPosition < this.actualPosition && this.i > 0) {

            /*change i and element width and margin in %*/
            this.i = this.i - 2;
            this.el.nativeElement.parentElement.style.width = parseInt(this.el.nativeElement.parentElement.style.width) + 2 + "%";
            this.el.nativeElement.parentElement.style.marginRight = this.i + "%";

            //SETTING NEW MAX VALUE
            this.sendMax += this.oneHalf;
            if (this.sendMax > this.max) {
              this.newValueMax.emit(this.max);
            }
            else {
              this.newValueMax.emit(this.sendMax);
            }

        }
      }
    }

  /* on mouse up*/
    @HostListener('window:mouseup', ['$event'])
    onMouseUp(event: any) {
      this.status = false;
      this.el.nativeElement.style.zIndex = 0;
  }

  /*Catching on resize and resseting style values*********/
    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
      this.i = 0;
      this.oneHalf = ((this.max - this.min) / 100) * 2;
      this.sendMax = this.max;
      this.startingPosition = this.el.nativeElement.getBoundingClientRect().right;
      this.actualPosition = event.pageX;
      this.el.nativeElement.setAttribute('style', 'right: "-11px"')
    }
}
