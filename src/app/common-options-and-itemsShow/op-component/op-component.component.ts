import { AppError } from './../../commonErrors/app-error';
import { PostService } from './../../services/post.service';
import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultServiceService } from 'src/app/services/result-service.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';
import { map } from 'rxjs/operators';
import { NotFoundError } from 'src/app/commonErrors/not-found-error';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-op-component',
  templateUrl: './op-component.component.html',
  styleUrls: ['./op-component.component.css']
})
export class OpComponentComponent implements OnInit {

  @Input("routeParam") routeParam!: any;
  @Output("filter") filter = new EventEmitter();
  maxPrice: number = 3000;
  minPrice: number = 0;
  maxDisplay!: number;
  minDisplay!: number;
  maxHDD!: number;
  minHDD!: number;
  maxRAM!: number;
  minRAM!: number;
  catName!: string;
  manufactuer!: string[];
  color!: string[];

  /*Value from input*/
  value!: string;

  Subscription!: Subscription;

  constructor(private result: ResultServiceService,private getDataService: PostService, private route: ActivatedRoute, private router: Router, public storage: StorageServiceService, private valueService:ResultServiceService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.settingData();
  }

  /*Set data to be shown in options*/
  settingData(): void{
    /*If search component or all items component*/
    if (this.routeParam === "All Products" || this.routeParam === "Search results") {

      this.minDisplay = 2.4;
      this.maxDisplay = 17.3;
      this.minHDD = 1;
      this.maxHDD = 2000;
      this.minRAM = 1;
      this.maxRAM = 32;
      this.color = ["RED", "GREY", "BLACK", "SILVER", "GOLD", "WHITE"];
      this.manufactuer = ["DELL","TOSHIBA","APPLE", "HP", "HUAWEI", "SAMSUNG", "LENOVO","LG", "GOOGLE", "MICROSOFT", "HONOR", "XIAOMI", "NOKIA","HTC","HUAWEI","SONY"]

    }

    else if (this.routeParam == "smartphones") {
          this.minDisplay = 2.4;
          this.maxDisplay = 8.3;
          this.minHDD = 4;
          this.maxHDD = 1000;
          this.minRAM = 1;
          this.maxRAM = 32;
          this.color = ["RED", "GREY", "BLACK", "SILVER", "GOLD", "WHITE"];
          this.manufactuer = ["APPLE", "LG", "GOOGLE", "MICROSOFT", "HONOR", "XIAOMI", "NOKIA","HTC","HUAWEI","SONY","MOTOROLA","HONOR"]
    }
    else if (this.routeParam == "tablets") {
          this.minDisplay = 7.9;
          this.maxDisplay = 12.9;
          this.minHDD = 8;
          this.maxHDD = 1000;
          this.minRAM = 1;
          this.maxRAM = 32;
          this.color = ["RED", "GREY", "BLACK", "SILVER", "GOLD", "WHITE"];
          this.manufactuer = ["APPLE", "HP", "HUAWEI", "MICROSOFT", "SAMSUNG", "LENOVO"]
    }

    else {
      this.minDisplay = 11.6;
          this.maxDisplay = 17.3;
          this.minHDD = 120;
          this.maxHDD = 2000;
          this.minRAM = 0;
          this.maxRAM = 32;
          this.color = ["RED", "GREY", "BLACK", "SILVER", "GOLD", "WHITE"];
          this.manufactuer = ["APPLE","Hp","LENOVO","MICROSOFT","FUJITSU","SAMSUNG","PANASONIC","DELL"]
    }
  }


  /*When Filter button is clicked call the function to get new data*/
  buttonClicked() {
    /*Getting input value and setting it to send it as a parameter to server*/
    this.Subscription = this.valueService.statusSearchInputVal.subscribe((x: any) => {
      this.value = x;
      this.valueService.changeValueAll([]);
      this.getData();
    })

  }

  getData(): void{
    /*If route is all products*/
    if (this.routeParam == "All Products") {
    this.getDataService.searchFilterItems("https://online-shop-node1.herokuapp.com/filterAll", { title: this.storage.data, value: this.value })

      .subscribe((x: any) => {
        /*Setting no items header display*/
        if(x.result.length > 0) this.result.setNoItems(false);
        if (x.result.length <= 0) this.result.setNoItems(true);

        setTimeout(() => {
          this.valueService.changeValueAll(x.result);
          this.filter.emit("clicked")
        }, 500);

      }, (error: AppError) => {
        if (error instanceof NotFoundError) {
          console.log("NotFoundError")
        }else throw error
      })
    }
    /*IF route is search result*/
    else if (this.routeParam == "Search results") {
      this.getDataService.searchFilterItems("https://online-shop-node1.herokuapp.com/filterSearch", { title: this.storage.data, value: this.value })
        .subscribe((x: any) => {

          /*Setting no items header display*/
          if(x.result.length > 0) this.result.setNoItems(false);
          if (x.result.length <= 0) this.result.setNoItems(true);

          setTimeout(() => {
            this.valueService.changeValueAll(x.result);
            this.filter.emit("clicked")
          }, 500);
      }, (error: AppError) => {
        if (error instanceof NotFoundError) {
          console.log("NotFoundError")
        }else throw error
      })
    }
    /* for all other routes***************************************/
    else {

      /*Adding route to storage data so we can get the category*/
      let x = this.storage.data.map((item: any) => item.route).indexOf(this.routeParam);
      if (x == -1) {
        this.storage.data.push(
          { route: this.routeParam }
        );
      }

      this.getDataService.getFilter("https://online-shop-node1.herokuapp.com/filter", { title: this.storage.data })
        .pipe(
          map((res:any)=>res.data)
        )
        .subscribe((x: any) => {

          /*Setting no items header display*/
          if(x.length > 0) this.result.setNoItems(false);
          if (x.length <= 0) this.result.setNoItems(true);

          if (x.length > 0) {
            setTimeout(() => {
              this.valueService.changeValueAll(x);
              this.filter.emit("clicked")
            }, 500);
          }
          else {
            setTimeout(() => {

              this.valueService.changeValueAll([]);
              this.filter.emit("clicked")

            }, 500);
          }

        }, (error: AppError) => {
          if (error instanceof NotFoundError) {
            console.log("NotFoundError")
          }else throw error
        })

    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if(this.Subscription != undefined) this.Subscription.unsubscribe()
  }

    /*on resize ***************************/
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.storage.data = [];
    this.settingData()
  }
}
