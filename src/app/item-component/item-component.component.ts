import { DataService } from './../services/data.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-item-component',
  templateUrl: './item-component.component.html',
  styleUrls: ['./item-component.component.css']
})
export class ItemComponentComponent implements OnInit {
  itemOBJ!: {};
  par1!: string;
  par2!: string;
  par1ToShow!: string;
  par2ToShow!: string;
  price!: string;
  description!: string;
  descriptionIMG!: string;
  quantity!: string;
  id!: any;
  itemHeader!: string;
  itemPhotos!: any[];
  options: any[] = [];
  features: any[] = [];

  constructor(private route: ActivatedRoute, private http: DataService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
        this.par1 = params.cat_name;
        this.par2 = params.prod_slug;
      this.id = parseInt(params.id);
      this.getData()
      });
  }
  getData(): void{
    this.http.getItem("https://online-shop-node1.herokuapp.com/getItem", { param1: this.par1, param2: this.par2,param3: this.id })
      .pipe(
        map((x:any) => x = x.result[0])
      )
      .subscribe((x: any) => {
        this.itemOBJ = x;
        this.par1ToShow = x.cat_title;
        this.par2ToShow = x.prod_title;
        this.price = x.prod_price;
        this.quantity = x.prod_quantity;
        this.description = x.prod_description;
        this.descriptionIMG = x.prod_images;
        this.quantity = x.prod_quantity;
        if (x.cat_title == "Used Desktops" || x.cat_title == "Used Laptops" || x.cat_title == "New Laptops") {
          this.options.push(
            { name: "Hard Drive Type", spec: x.spec_hddType },
            { name: "Storage space", spec: x.spec_hdd },
            { name: "RAM size", spec: x.spec_ram },
            { name: "Display size", spec: x.spec_screen_size },
            { name: "Graphics card", spec: x.spec_graphic_card },
            { name: "Color", spec: x.spec_color },
            { name: "Keyboard layout", spec: x.spec_keyboard_layout },
            { name: "Condition", spec: x.spec_state }
          );
          this.features.push(
            { name: "Hard Drive Type", spec: x.spec_hddType },
            { name: "Storage space", spec: x.spec_hdd },
            { name: "RAM size", spec: x.spec_ram },
            { name: "Display size", spec: x.spec_screen_size },
            { name: "Graphics card", spec: x.spec_graphic_card },
            { name: "Color", spec: x.spec_color },
            { name: "Processor", spec: x.spec_processor },
            { name: "Operating system", spec: x.spec_operating_system },
            { name: "Guarantee", spec: x.spec_guarantee }
          )
        }
        if (x.cat_title == "Smartphones" || x.cat_title == "Tablets") {

          this.options.push(
            {name: "Storage space", spec: x.spec_hdd},
            {name: "RAM size", spec: x.spec_ram },
            {name: "Display size", spec: x.spec_screen_size},
            {name: "Front camera", spec: x.spec_front_camera},
            {name: "Back camera", spec: x.spec_back_camera},
            {name: "Color", spec: x.spec_color},
            {name: "Condition", spec: x.spec_state}
          )
          this.features.push(
            {name: "Operating system", spec: x.spec_operating_system},
            {name: "Storage space", spec: x.spec_hdd},
            {name: "RAM size", spec: x.spec_ram },
            {name: "Display size", spec: x.spec_screen_size},
            {name: "Front camera", spec: x.spec_front_camera},
            {name: "Back camera", spec: x.spec_back_camera},
            {name: "Batery", spec: x.spec_battery},
            {name: "Connection", spec: x.spec_connection},
            {name: "Graphic card", spec: x.spec_graphic_card_details},
            {name: "Processor", spec: x.spec_processor},
            {name: "Resolution", spec: x.spec_resolution},
            {name: "Maesure", spec: x.spec_measure},
            {name: "Guarantee", spec: x.spec_guarantee}
          )
        }
        this.itemHeader = x.prod_title;
        this.itemPhotos = x.spec_photo_item.split(",");
      })
  }
}
