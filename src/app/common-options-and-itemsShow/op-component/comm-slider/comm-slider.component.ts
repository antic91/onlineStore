import { Component, HostListener, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-comm-slider',
  templateUrl: './comm-slider.component.html',
  styleUrls: ['./comm-slider.component.css']
})
export class CommSliderComponent implements OnInit {

  @ViewChild('upper', { read: ElementRef }) upper!: ElementRef;

  /*Input header and min and max values**************************/
  @Input("headerCommon") headerCommon!: any;
  @Input("min") min!: number;
  @Input("max") max!: number;

  minToShow!: number;
  maxToShow!: number;
  statusStart!: boolean;
  statusEnd!: boolean;

  constructor(private storage: StorageServiceService) { }

  ngOnInit(): void {
    /*Setting values*/
    this.minToShow = this.min;
    this.maxToShow = this.max;
  }

  /*Setting function min after moving*/
  setMIn(event: any) {

    this.minToShow = event;

    /*Setting data to set it in storage*/
    let data = {
      name: this.headerCommon,
      min: this.minToShow,
      max: this.maxToShow
    }

    if (this.storage.data.length == 0) {
      this.storage.data.push(data)
    }
    else {
      var index = this.storage.data.map((item: any) => item.name).indexOf(this.headerCommon);
      if (index == -1) {
        this.storage.data.push(data)
      } else {
        this.storage.data.splice(index, 1, data)
      }
    }
  }

  /*Setting function max after moving*/
  setMax(event: any) {

    this.maxToShow = event;

    /*Setting data to set it in storage*/
    let data = {
      name: this.headerCommon,
      min: this.minToShow,
      max: this.maxToShow
    }

    if (this.storage.data.length == 0) {
      this.storage.data.push(data)
    } else {
      var index = this.storage.data.map((item: any) => item.name).indexOf(this.headerCommon);
      if (index == -1) {
        this.storage.data.push(data);
      } else {
        this.storage.data.splice(index, 1, data)
      }
    }
  }

  /*Setting status true or false for z-index*/
  setStartStatus(event: any) {
    this.statusEnd = false;
    this.statusStart = true;
  }

  setEndStatus(event: any) {
    this.statusEnd = true;
    this.statusStart = false;
  }

  /*Catching on resize and resseting style values*********/
    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
      this.maxToShow = this.max;
      this.minToShow = this.min;
      this.upper.nativeElement.setAttribute('style', 'width:100%')
    }
}
