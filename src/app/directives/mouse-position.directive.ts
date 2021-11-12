import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[mousemoving]'
})
export class MousePositionDirective {

  /*Getting values*/
  @Input("max") max!:number;
  @Input("min") min!: number;
  @Input("maxShow") maxToShow!: number;

  /*Emitters*/
  @Output() newValueMin: any = new EventEmitter();
  @Output() newValueMStatus: any = new EventEmitter();

  /*Clicked status*/
  status: boolean = false;

  /*Value to play with width*/
  minI: any = 0;


  startingPosition!: number;
  actualPosition!: number;

  two!: number;
  sendMin!: number;

  constructor(private el:ElementRef) { }
  ngOnInit(): void {
    this.two = ((this.max - this.min) / 100)*2 ;
    this.sendMin = this.min;
  }

  /*Mousedown event*/
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: any) {
      this.status = true;
      this.newValueMStatus.emit(true)
  }

  /*Mousemove event*/
  @HostListener('document:mousemove', ['$event'])
  Move(event: any) {

      event.preventDefault();

      this.startingPosition = this.el.nativeElement.getBoundingClientRect().left;
      this.actualPosition = event.pageX;

      /*If mouse is down*/
    if (this.status) {

      /*If starting position is smaller then actual position and i is <100*/
      if (this.startingPosition <= this.actualPosition + 15 && this.minI < 100) {

        /*If sendMin is bigger or eq then maxToShow emit new value maxToShow...*/
        if (this.sendMin >= this.maxToShow) {
          this.newValueMin.emit(this.maxToShow);
          return
        }

        /*else change element width and margin in %*/
        this.minI = this.minI + 2;

        this.el.nativeElement.parentElement.style.width = (100-this.minI) + "%";
        this.el.nativeElement.parentElement.style.marginLeft = this.minI + "%";

        //SETTING NEW MIN VALUE
        this.sendMin += this.two;

        if (this.sendMin > this.max) {
            this.newValueMin.emit(this.max);
        }
        else {
            this.newValueMin.emit(this.sendMin);
        }
      }

      /*If starting position is smaller then actual position and minI is > 0*/
      if (this.startingPosition > this.actualPosition - 15 && this.minI > 0) {

        /*change minI and element width and margin in %*/
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

  /* on mouse up*/
  @HostListener('window:mouseup', ['$event'])
    onMouseUp(event: any) {
      this.status = false;
  }

  /*Catching on resize and resseting style values*********/
    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
      this.minI = 0;
      this.sendMin = this.min;
      this.startingPosition = this.el.nativeElement.getBoundingClientRect().left;
      this.actualPosition = event.pageX;
      this.two = ((this.max - this.min) / 100)*2 ;
      this.el.nativeElement.setAttribute('style', 'left: "-11px"')
    }
}
