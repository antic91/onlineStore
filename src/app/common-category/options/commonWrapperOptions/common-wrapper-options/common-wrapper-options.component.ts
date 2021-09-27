import { Component, Input, OnInit } from '@angular/core';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-common-wrapper-options',
  templateUrl: './common-wrapper-options.component.html',
  styleUrls: ['./common-wrapper-options.component.css']
})
export class CommonWrapperOptionsComponent implements OnInit {
  @Input("optionsCommon") optionsHeader!: string;
  @Input("options") manufactuer!: string[];
  constructor(private storage: StorageServiceService) { }

  ngOnInit(): void {

  }
  click(event: any, item: any): void{

    if (event.srcElement.style.backgroundColor == "" && event.srcElement.style.color == "") {
      event.srcElement.style.backgroundColor = '#C8D8E4';
    } else {
      event.srcElement.style.backgroundColor = "";
      event.srcElement.style.color = "";
    }
    let data = {
      name: this.optionsHeader,
      items: [item],
    }

    if (this.storage.data.length == 0) {
      this.storage.data.push(data);
      return
    }
    if (this.storage.data != 0) {
      var index = this.storage.data.map((item: any) => item.name).indexOf(this.optionsHeader);
      if (index == -1) {
        this.storage.data.push(data);
        return
      }
      if (index >= 0) {
        let dataSTR = this.storage.data[index].items.map((itemData: any) => itemData).indexOf(item);
        if (dataSTR == -1) {
          this.storage.data[index].items.push(item);
          return
        }
        if (dataSTR >= 0) {
          this.storage.data[index].items.splice(dataSTR, 1);
          if (this.storage.data[index].items.length == 0) {
            this.storage.data.splice(index,1)
          }
        }
      }

    }
  }
}
