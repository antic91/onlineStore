import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-common-category',
  templateUrl: './common-category.component.html',
  styleUrls: ['./common-category.component.css']
})
export class CommonCategoryComponent implements OnInit {
  param!: string;
  filterStatus: boolean = false;

  constructor() { }

  ngOnInit() {
  }
  gettinRoute(event: any) {
    this.param = event;
    console.log(event)
  }
  getStatus(event: any) {
    this.filterStatus = event;
  }
}
