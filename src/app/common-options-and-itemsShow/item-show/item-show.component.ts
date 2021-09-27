import { Component, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ResultServiceService } from 'src/app/services/result-service.service';

@Component({
  selector: 'app-item-show',
  templateUrl: './item-show.component.html',
  styleUrls: ['./item-show.component.css']
})
export class ItemShowComponent implements OnInit {
  @Input("clicked") clicked!: boolean;
  objects!: any[];
  objectsToShow: any = [];
  value!: string;

  constructor(private result: ResultServiceService, private router: Router) { }



  ngOnInit() {
    this.result.statusStringVal.subscribe((x: any) => {
      this.value = x;
      this.showData();
    })
  }

  showData(): void{
    if (this.value == "allProducts") {
        this.result.statusResultAll.subscribe((x: any) => {
          /*if (!x) {
            this.router.navigate(["home"]);
            return
          }*/
          this.objects = x;
          this.objectsToShow = this.objects.splice(0, 9)
        })

    }
    else {
        this.result.statusResult.subscribe((x: any) => {

          /*if (!x) {
            this.router.navigate(["home"]);
            return
          }*/
          this.objects = x;
          this.objectsToShow = this.objects.splice(0, 9)
        })
    }
  }

  showMore() {
    if (this.objects.length > 8) {
      this.objectsToShow= this.objectsToShow.concat(this.objects.splice(0, 9))
    } else {
      this.objectsToShow= this.objectsToShow.concat(this.objects.splice(0, this.objects.length))
    }
  }


  /*Detecting filter changes */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.clicked.currentValue) {
      setTimeout(() => {
        if(!this.objects && !this.objectsToShow) this.showData()
      }, 500);
    }
  }
}
