import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-lower',
  templateUrl: './lower.component.html',
  styleUrls: ['./lower.component.css']
})
export class LowerComponent implements OnInit {
  @Input("object") objects: any;
  @Output("changing") status = new EventEmitter;
  constructor() { }

  ngOnInit(): void {
  }
  changing() {
    this.status.emit("true")
  }
  changingFalse() {
    this.status.emit("false")
  }
}
