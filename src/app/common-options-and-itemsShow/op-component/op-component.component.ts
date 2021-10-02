import { AppError } from './../../commonErrors/app-error';
import { PostService } from './../../services/post.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultServiceService } from 'src/app/services/result-service.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';
import { map } from 'rxjs/operators';
import { NotFoundError } from 'src/app/commonErrors/not-found-error';

@Component({
  selector: 'app-op-component',
  templateUrl: './op-component.component.html',
  styleUrls: ['./op-component.component.css']
})
export class OpComponentComponent implements OnInit {
  @Input("routeParam") param!: any;
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
  value!: string;
  constructor(private getDataService: PostService, private route: ActivatedRoute, private router: Router, public storage: StorageServiceService, private valueService:ResultServiceService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.settingData();
  }
  settingData(): void{
          this.minDisplay = 2.4;
          this.maxDisplay = 17.3;
          this.minHDD = 1;
          this.maxHDD = 2000;
          this.minRAM = 1;
          this.maxRAM = 32;
          this.color = ["RED", "GREY", "BLACK", "SILVER", "GOLD", "WHITE"];
          this.manufactuer = ["APPLE", "HP", "HUAWEI", "MICROSOFT", "SAMSUNG", "LENOVO","LG", "GOOGLE", "MICROSOFT", "HONOR", "XIAOMI", "NOKIA","HTC","HUAWEI","SONY","MOTOROLA"]

  }

  buttonClicked() {

    this.valueService.statusStringVal.subscribe((x: any) => {
      this.value = x;
      this.getData()
    })

  }

  getData(): void{

    if (this.value == "allProducts") {
    this.getDataService.searchFilterItems("https://online-shop-node1.herokuapp.com/filterAll", { title: this.storage.data, value: this.value })

      .subscribe((x: any) => {
        setTimeout(() => {
          this.valueService.changeValueAll(x.result);
          this.filter.emit("clicked")
        }, 500);

      }, (error: AppError) => {
        if (error instanceof NotFoundError) {
          console.log("NotFoundError")
        }else throw error
      })
    } else {
      this.getDataService.searchFilterItems("https://online-shop-node1.herokuapp.com/filterSearch", { title: this.storage.data, value: this.value })

        .subscribe((x: any) => {
        setTimeout(() => {
          this.valueService.changeValue(x.result);
          this.filter.emit("clicked")
        }, 500);
      }, (error: AppError) => {
        if (error instanceof NotFoundError) {
          console.log("NotFoundError")
        }else throw error
      })
    }
  }

}
