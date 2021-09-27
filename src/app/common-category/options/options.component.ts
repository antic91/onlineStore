import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, Input, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
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
  constructor(private route: ActivatedRoute, private router: Router, public storage: StorageServiceService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    if (this.param != "all") {
      this.route.params
      .subscribe((x: any) => {
        this.catName = x.cat_name;
      })
    }
    this.settingData()
  }
  settingData(): void{
    if (this.catName == "smartphones") {
          this.minDisplay = 2.4;
          this.maxDisplay = 8.3;
          this.minHDD = 4;
          this.maxHDD = 1000;
          this.minRAM = 1;
          this.maxRAM = 32;
          this.color = ["RED", "GREY", "BLACK", "SILVER", "GOLD", "WHITE"];
          this.manufactuer = ["APPLE", "LG", "GOOGLE", "MICROSOFT", "HONOR", "XIAOMI", "NOKIA","HTC","HUAWEI","SONY","MOTOROLA","HONOR"]
        }
        if (this.catName == "tablets") {
          this.minDisplay = 7.9;
          this.maxDisplay = 12.9;
          this.minHDD = 8;
          this.maxHDD = 1000;
          this.minRAM = 1;
          this.maxRAM = 32;
          this.color = ["RED", "GREY", "BLACK", "SILVER", "GOLD", "WHITE"];
          this.manufactuer = ["APPLE", "HP", "HUAWEI", "MICROSOFT", "SAMSUNG", "LENOVO"]
        }
        else if(this.catName != "tablets" && this.catName != "smartphones") {
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


  /*Catching button event*/
  buttonClicked() {
    this.filter.emit(true)
  }
  buttonRelased() {
    this.filter.emit(false)
  }
}
