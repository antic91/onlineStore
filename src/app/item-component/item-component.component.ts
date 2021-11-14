import { PostService } from 'src/app/services/post.service';
import { AppError } from './../commonErrors/app-error';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { NotFoundError } from '../commonErrors/not-found-error';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeIn } from '../animations/animations';

@Component({
  selector: 'app-item-component',
  templateUrl: './item-component.component.html',
  styleUrls: ['./item-component.component.css'],
  animations: [
    trigger('fadeIn',[
      transition(':enter', [
        useAnimation(fadeIn, {
          params: {
            opacity1: 0,
            opacity2: 1,
            time:'500ms ease-in'
          }
        })
      ]),
      transition(':leave', [
        useAnimation(fadeIn, {
          params: {
            opacity1: 0,
            opacity2: 1,
            time:'500ms ease-in'
          }
        })
      ])
    ])
  ]
})
export class ItemComponentComponent implements OnInit {
  /*Object for item options component*/
  itemOBJ: any = {};

  /*Params that we get from route, we use them to send to server. so we could find product we want..*/
  id!: any;
  par1!: string;
  par2!: string;

  /*Route params for top route div*/
  par1ToShow!: string;
  par2ToShow!: string;

  /*Product price for item options component*/
  price!: string;

  /*Description to send it to description component*/
  description!: string;
  /*Description image to send it to description component*/
  descriptionIMG!: string;

  /*Product quantity for item options component*/
  quantity!: string;

  /*Items header for item-photo-header component*/
  itemHeader!: string;

  /*Item photos for item-photo-header component*/
  itemPhotos!: any[];

  /*Product options for item options component*/
  options: any[] = [];

  /*All features to send it to features component*/
  features: any[] = [];

  constructor(private route: ActivatedRoute, private http: PostService) { }

  ngOnInit(): void {
    /*Setting data to send to server and calling function to talk with server*/
    this.route.params.subscribe((params: Params) => {
        this.par1 = params.cat_name;
        this.par2 = params.prod_slug;
        this.id = parseInt(params.id);
        this.getData()
      });
  }

  /*Getting answer from server*/
  getData(): void{
    this.http.getItem("https://online-shop-node1.herokuapp.com/getItem", { param1: this.par1, param2: this.par2,param3: this.id })
      .pipe(
        map((x:any) => x = x.result[0])
      )
      .subscribe((x: any) => {
        /*Adding object to send it to item options component*/
        this.itemOBJ = x;
        /*Setting all necessary data here after server response*/
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
            {name: "Battery", spec: x.spec_battery},
            {name: "Connection", spec: x.spec_connection},
            {name: "Graphic card", spec: x.spec_graphic_card_details},
            {name: "Processor", spec: x.spec_processor},
            {name: "Resolution", spec: x.spec_resolution},
            {name: "Measure", spec: x.spec_measure},
            {name: "Guarantee", spec: x.spec_guarantee}
          )
        }
        this.itemHeader = x.prod_title;
        this.itemPhotos = x.spec_photo_item.split(",");

      }, (error: AppError) => {
        if (error instanceof NotFoundError) {
          console.log("NotFoundError")
        }else throw error
    })
  }
}
