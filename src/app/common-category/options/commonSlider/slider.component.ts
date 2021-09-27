import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class sliderComponent implements OnInit {
  @Input("headerCommon") headerCommon!: any;
  @Input("min") min!: number;
  @Input("max") max!: number;
  minToShow!: number;
  maxToShow!: number;
  statusStart!: boolean;
  statusEnd!: boolean;

  constructor(private storage: StorageServiceService) { }

  ngOnInit(): void {
    this.minToShow = this.min;
    this.maxToShow = this.max;
  }
  setMIn(event: any) {
    this.minToShow = event;
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
        this.storage.data.push(data)
      } else {
        this.storage.data.splice(index, 1, data)
      }
    }
  }
  setMax(event: any) {
    this.maxToShow = event;
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
  setStartStatus(event: any) {
    this.statusEnd = false;
    this.statusStart = true;
  }
  setEndStatus(event: any) {
    this.statusEnd = true;
    this.statusStart = false;
  }
}
