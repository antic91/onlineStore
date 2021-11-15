import { trigger, transition, useAnimation, animate, state, style } from '@angular/animations';
import { PostService } from './../services/post.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ResultServiceService } from '../services/result-service.service';
import { map } from 'rxjs/operators';
import { fadeIn, slideAnim } from '../animations/animations';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css'],
  animations: [
    trigger('SlideIn', [
      transition(':enter',[
        useAnimation(slideAnim,{
          params:{
            opacity1:0,
            opacity2:1,
            time:'500ms ease-in',
            translateValue:'translate3d',
            translateValue1:'translate3d',
            translate1:'100%',
            translate2:'0',
            translate3:'0',
            translate4:'0',
            translate5:'0',
            translate6:'0'
          }
        })
      ]),
      transition(':leave',[
        useAnimation(slideAnim,{
          params:{
            opacity1:1,
            opacity2:0,
            time:'500ms ease-in',
            translateValue:'translate3d',
            translateValue1:'translate3d',
            translate1:'0',
            translate2:'0',
            translate3:'0',
            translate4:'100%',
            translate5:'0',
            translate6:'0'
          }
        })
      ])
    ]),
    trigger('SlideInOne', [
      transition(':enter',[
        useAnimation(slideAnim,{
          params:{
            opacity1:0,
            opacity2:1,
            time:'500ms ease-in',
            translateValue:'translate3d',
            translateValue1:'translate3d',
            translate1:'100%',
            translate2:'0',
            translate3:'0',
            translate4:'0',
            translate5:'0',
            translate6:'0'
          }
        })
      ]),
      transition(':leave',[
        useAnimation(slideAnim,{
          params:{
            opacity1:1,
            opacity2:0,
            time:'500ms ease-in',
            translateValue:'translate3d',
            translateValue1:'translate3d',
            translate1:'0',
            translate2:'0',
            translate3:'0',
            translate4:'100%',
            translate5:'0',
            translate6:'0'
          }
        })
      ])
    ]),

    trigger('slideInOptions', [
      state('false', style({ opacity:'1', transform:'translate3d(-100%, 0, 0)'})),
      state('true', style({ opacity:'1', transform:'translate3d(0, 0, 0)'})),
      transition('false => true', animate('500ms ease-in')),
      transition('true => false', animate('500ms ease-out'))
    ]),
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
export class AllComponent implements OnInit {

  /*I made this Component while I wanted to make other design, but at the end i
  leaved it like all other categories and it is possible to leave all and search
  result component together with common categories component . The Style(css) and HTML
  are the same right now but its possible to change it !*/


  /*Opacity fade in on start*/
  ShowData: boolean = false;

  /*Show or hide bollean for smaller filter*/
  showHide: boolean = false;

  /*Show or hide animation filter button*/
  showHide1: boolean = true;

  routeParam: string = "All Products";

  clicked: boolean = false;

  objectData!: any[];

  objectCat: any[] = [
    {cat_slug: 'usedLaptops', cat_title: "Used Laptops", cat_image: "https://media.istockphoto.com/photos/laptop-with-blank-screen-isolated-on-white-background-picture-id1128662796"},
    {cat_slug: 'usedDesktops', cat_title: "Used desktops", cat_image: "https://media.istockphoto.com/photos/computer-display-with-blank-white-screen-ncomputer-monitor-isolated-picture-id1183337149"},
    {cat_slug: 'newLaptops', cat_title: "New laptops", cat_image: "https://media.istockphoto.com/photos/laptop-with-blank-screen-isolated-on-white-background-picture-id1128662796"},
    {cat_slug: 'tablets', cat_title: "Tablets", cat_image: "https://st.depositphotos.com/1028911/3779/i/950/depositphotos_37793543-stock-photo-closeup-of-tablet-with-blank.jpg"},
    {cat_slug: 'smartphones', cat_title: "Smartphones", cat_image: "https://media.istockphoto.com/photos/mobile-phone-top-view-with-white-screen-picture-id1161116588?s=612x612"}
  ];


  constructor(private result: ResultServiceService,private route: ActivatedRoute, private service: PostService) { }

  ngOnInit(): void {
    this.ShowData = true;
    /*Getting parameters from route and setting it to Observable*/
    this.route.url.subscribe((x: any) => {
      this.result.changeStringValue(x[0].path);
    })
    this.result.changeValueAll([])

    /*Getting all items from server*/
    this.service.getAll("https://online-shop-node1.herokuapp.com/all")
      .pipe(
        map((x:any)=> x = x.result)
      )
      .subscribe((x: any) => {
        if (x.length > 0) {

          /*Resetting observable*/



          /*Setting observable array with all values*/
          this.result.changeValueAll(x);
          this.result.setNoItems(false)


          /*Setting object with items to send it to item-show component*/
          this.objectData = x;

          /* Here we can get all categories from service ---- it is added to observable on page init in navigation
          this.result.categoriesResult.subscribe((x:any)=> console.log(x))
          */
        } else {
          this.result.setNoItems(true)
        }
    })
  }


  /*Catching filter button click event*/
  filterClicked(event: any) {
    console.log(event)
    if (event == "clicked") this.clicked = true;
    this.showHide = false;
    this.showHide1 = true;
      setTimeout(() => {
        this.clicked = false;
      }, 500);
  }

  /*Function for showing or hiding filter option for smaller devices and setting animations trigger*/
  showHideFilter(): void {
    this.showHide = !this.showHide
    this.showHide1 = !this.showHide1
  }

  /*on resize close smaller filter options*/
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {

    this.showHide = false;
    this.showHide1 = true;
  }

}
