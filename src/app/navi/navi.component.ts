import { trigger, transition, useAnimation } from '@angular/animations';
import { LogedInService } from 'src/app/services/loged-in.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';
import { PostService } from '../services/post.service';
import { ResultServiceService } from '../services/result-service.service';
import { fadeIn } from '../animations/animations';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        useAnimation(fadeIn, {
          params: {
            opacity1: 0,
            opacity2: 1,
            time:"400ms ease-in"
          }
        })
      ]),
      transition(':leave', [
        useAnimation(fadeIn, {
          params: {
            opacity1: 1,
            opacity2: 0,
            time:"400ms ease-in"
          }
        })
      ])
    ])
  ]
})
export class NaviComponent implements OnInit {
  /*Object are answer from server with categories*/
  objects: any[] = [
    {cat_slug: 'usedLaptops', cat_title: "Used Laptops", cat_image: "https://media.istockphoto.com/photos/laptop-with-blank-screen-isolated-on-white-background-picture-id1128662796"},
    {cat_slug: 'usedDesktops', cat_title: "Used desktops", cat_image: "https://media.istockphoto.com/photos/computer-display-with-blank-white-screen-ncomputer-monitor-isolated-picture-id1183337149"},
    {cat_slug: 'newLaptops', cat_title: "New laptops", cat_image: "https://media.istockphoto.com/photos/laptop-with-blank-screen-isolated-on-white-background-picture-id1128662796"},
    {cat_slug: 'tablets', cat_title: "Tablets", cat_image: "https://st.depositphotos.com/1028911/3779/i/950/depositphotos_37793543-stock-photo-closeup-of-tablet-with-blank.jpg"},
    {cat_slug: 'smartphones', cat_title: "Smartphones", cat_image: "https://media.istockphoto.com/photos/mobile-phone-top-view-with-white-screen-picture-id1161116588?s=612x612"}
  ];

  show: boolean = false;

  condition: boolean = true;

  /*Login and logount boolean for smaller dropdown*/
  showMenu: boolean = false;
  showLogin: boolean = false;

  constructor(private http: HttpClient, private service: PostService,private resultSer: ResultServiceService,private load: LogedInService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.load.setLoaded(true)
    }, 300);

    /*server Responsewith categories we can use this to get random categories from server*/
/*
    this.service.getAll("https://online-shop-node1.herokuapp.com/")
      .pipe(
        map((res:any)=> res.results)
      )
      .subscribe((arg: any) => {

        this.objects = arg;

        this.resultSer.setCategories(this.objects)

        this.load.setLoaded(true)
        console.log(this.objects)
      });
*/
  }

  /*catching emit from lower component*/
  changeTrue(event: any) {
    if(event == "true"){
      this.show = true;
    }
    setTimeout(() => {
      if(event == "false" && this.condition){
        this.show = false;
      }
    }, 500);
  }

  /*catching emit from drop down*/
  closeDropDown(event: any) {
    if(event == "false"){
      this.show = false;
      this.condition = true;
    }
    if(event == "true"){
      this.show = true;
      this.condition = false;
    }
  }


  /*Show or hide login dropDown for smaller screens*/
  checkLoginDrop($event: boolean): void{
    if ($event==true && this.showMenu == true) {
      return
    } else {
      this.showLogin = $event;
    }
  }

  /*Show or hide Menu dropDown for smaller screens*/
  checkMenuDrop($event: boolean): void{
    if ($event==true && this.showLogin == true) {
      return
    } else {
      this.showMenu = $event;
    }
  }

  /*emit from smaller drop down*/
  changeStatusMenu($event: boolean): void{
    this.showLogin = $event;
    this.showMenu = $event;
  }
}
