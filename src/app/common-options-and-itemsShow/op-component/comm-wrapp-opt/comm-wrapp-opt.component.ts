import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-comm-wrapp-opt',
  templateUrl: './comm-wrapp-opt.component.html',
  styleUrls: ['./comm-wrapp-opt.component.css']
})
export class CommWrappOptComponent implements OnInit {

  @ViewChild('spanEl', { read: ElementRef }) spanEl!: ElementRef;

  /*Two input params with header and options*/
  @Input("optionsCommon") optionsHeader!: string;
  @Input("options") options!: string[];

  constructor(private storage: StorageServiceService) { }

  ngOnInit(): void {

  }
  /*On click on one option*/
  click(event: any, item: any): void{

    /*Changing background color*****/
    if (event.srcElement.style.backgroundColor == "" && event.srcElement.style.color == "") {

      event.srcElement.style.backgroundColor = 'rgba(83, 64, 255, .9)';
      event.srcElement.style.color = '#ffffff';

    } else {

      event.srcElement.style.backgroundColor = "";
      event.srcElement.style.color = "";
    }
    /***************************** */
    /*Making object after one click from clicked option*/
    let data = {
      name: this.optionsHeader,
      items: [item],
    }

    /*If there is nothing in storage then push data item*/
    if (this.storage.data.length == 0) {
      this.storage.data.push(data);
      return
    }

    /*If there is something in storage then check ****/
    if (this.storage.data != 0) {
      /*Check index off clicked option*/
      var index = this.storage.data.map((item: any) => item.name).indexOf(this.optionsHeader);
      /*If there is no such header option then push data*/
      if (index == -1) {
        this.storage.data.push(data);
        return
      }

      /*If there is header option then...*/
      if (index >= 0) {

        /*get index of one option*/
        let dataSTR = this.storage.data[index].items.map((itemData: any) => itemData).indexOf(item);

        /*If there is none then push it to array[INDEX]*/
        if (dataSTR == -1) {
          this.storage.data[index].items.push(item);
          return
        }

        /*If there is then remove option andif array will empty remove array also*/
        if (dataSTR >= 0) {
          this.storage.data[index].items.splice(dataSTR, 1);

          if (this.storage.data[index].items.length == 0) {
            this.storage.data.splice(index,1)
          }

        }
      }

    }
  }

  /*Catching on resize and resseting style values*********/
    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
      this.spanEl.nativeElement.setAttribute('style', 'color: ""; background: ""')
    }
}
