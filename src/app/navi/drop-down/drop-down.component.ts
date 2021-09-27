import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ignoreElements } from 'rxjs/operators';
import { ResultServiceService } from 'src/app/services/result-service.service';
@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css']
})
export class DropDownComponent implements OnInit {
  @Input("object") objects: any;
  @Input("show") show: any;
  @Output("status-change") status = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  changeStatus(event:any) {
    this.status.emit(event)
  }
}
