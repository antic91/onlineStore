import { trigger, transition, useAnimation } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { fadeIn, slideAnim } from 'src/app/animations/animations';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-actions-home',
  templateUrl: './actions-home.component.html',
  styleUrls: ['./actions-home.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        useAnimation(fadeIn, {
          params: {
            opacity1: 0,
            opacity2: 1,
            time: '300ms 300ms ease-in'
          }
        })
      ]),
      transition(':leave', [
        useAnimation(fadeIn, {
          params: {
            opacity1: 1,
            opacity2: 0,
            time: '300ms ease-in'
          }
        })
      ])
    ]),
    trigger("slideIn", [
      transition(":enter", [
        useAnimation(slideAnim,{
          params:{
            opacity1:0,
            opacity2:1,
            time:'300ms 300ms ease-in',
            translateValue:"translate3d",
            translateValue1:"translate3d",
            translate1:"100%",
            translate2:"0",
            translate3:"0",
            translate4:"0",
            translate5:"0",
            translate6:"0"
          }
        })
      ]),
      transition(":leave", [
        useAnimation(slideAnim,{
          params:{
            opacity1:0,
            opacity2:1,
            time:'300ms ease-in',
            translateValue:"translate3d",
            translateValue1:"translate3d",
            translate1:"0",
            translate2:"0",
            translate3:"0",
            translate4:"100%",
            translate5:"0",
            translate6:"0"
          }
        })
      ])
    ])
  ]
})
export class ActionsHomeComponent implements OnInit {

  details!: number;
  details1!: number;

  saleObjects: any = [];
  constructor(private service: PostService, private http: HttpClient) { }

  ngOnInit(): void {
    /*calling server for data */
    this.service.getAll("https://online-shop-node1.herokuapp.com/home")
      .pipe(
        map((res:any)=> res.results)
      )
      .subscribe((res: any) => {
        this.saleObjects = res;
        console.log(this.saleObjects)
      });
  }

  /*Change details show price or see details text*/
  mouseOver(event:number): void{
    this.details = event;
  }
  mouseLeave(event:number): void{
    this.details = -1;
  }

  /*Addto cart function*/
  addToBag(): void{
    console.log("add")
  }
}
