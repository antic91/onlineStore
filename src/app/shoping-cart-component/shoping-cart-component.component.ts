import { PostService } from './../services/post.service';
import { Component, ComponentFactoryResolver, OnInit, SimpleChanges } from '@angular/core';
import { LogedInService } from '../services/loged-in.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeIn } from '../animations/animations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shoping-cart-component',
  templateUrl: './shoping-cart-component.component.html',
  styleUrls: ['./shoping-cart-component.component.css'],
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
export class ShopingCartComponentComponent implements OnInit {

  noItems: boolean = false;

  data: any[] = [];

  orderQuantity: any[] = [];

  UserLoggedIn: boolean = false;

  user!: string;

  id!: number;


  totalPrice: number = 0;

  Subscription!: Subscription;
  Subscription1!: Subscription;

  constructor(private loggedUser: LogedInService, private postSer: PostService) { }

  ngOnInit(): void {
    /*On init check if the user is logged
    */
    this.Subscription = this.loggedUser.statusUser.subscribe((x: any) => {
      if (x) {
        /*if true then call function get data and store user values*/
        this.Subscription1 = this.loggedUser.statusId.subscribe((y: any) => {
          this.getData(x, y);
          this.UserLoggedIn = true;
          this.user = x;
          this.id = y;
        })
      }
      /*If not check localStorage*/
      if(!x){
        const localStData = JSON.parse(localStorage.getItem('itemCart') || '{}');
        if (localStData.length > 0) {
          localStData.forEach((element: any) => {
            this.totalPrice = this.totalPrice + (element.orderQuantity*element.item.prod_price)
            this.orderQuantity.push(element.orderQuantity);
            this.data.push(element.item);
          });
        } else {
          this.noItems = true;
        }
      }
    })
  }

  /*Get data from server*/
  getData(x: any, y: any): void{
    const data = {
      user: x,
      id: y
    };
    this.postSer.getFromCart("https://online-shop-node1.herokuapp.com/getFromCart", data)
      .subscribe((res: any) => {

        if (res.result.length > 0) {
          this.data = res.result;
          res.result.forEach((a: any) => {
            this.totalPrice = this.totalPrice + (a.item_quantity*a.prod_price)
            this.orderQuantity.push(a.item_quantity)
          })
        }
        else {
          /*if there is no data then show no items div*/
          this.noItems = true;
        }
      });
  }


  /*Add item*/
  addOneItem(item: any, i: number): void{

    this.orderQuantity[i]++;
    this.totalPrice = this.totalPrice + item.prod_price;

    /*set data and then check if user is logged or not*/
    let data1 = {
        catId: parseInt(item.cart_id),
        id: this.id,
        quantity: parseInt(this.orderQuantity[i]),
        prodId: parseInt(item.prod_id),
        status:"minus"
      }

    /*If user is nor logged then add quantity to localStorage*/
    if (!this.UserLoggedIn) {
      const localST = JSON.parse(localStorage.getItem('itemCart') || '{}');
      localST[i].orderQuantity = this.orderQuantity[i];
      localStorage.setItem("itemCart", JSON.stringify(localST));
    } else {
      /*Else add it to server*/
      this.postSer.changeValues("https://online-shop-node1.herokuapp.com/changeValues", data1)
      .subscribe((b:any)=> console.log("Added"))
    }
  }

  /*Remove one item function*/
  removeOneItem(item: any, i: number): void{
    if (this.orderQuantity[i] == 0 || this.orderQuantity[i] == undefined) {
      return
    }

    this.orderQuantity[i]--;
    this.totalPrice = this.totalPrice - item.prod_price;

    /*Set data to be removed*/
    let data2 = {
        catId: item.cart_id,
        id: this.id,
        quantity: this.orderQuantity[i],
        prodId: parseInt(item.prod_id),
        status:"minus"
      }

    /*If order quantity of item is 0 then remove that item from localStorage*/
    if (this.orderQuantity[i] == 0) {
      this.orderQuantity.splice(i,1);
      this.data.splice(i, 1);
      const localST = JSON.parse(localStorage.getItem('itemCart') || '{}');
      localST.splice(i,1)
      localStorage.setItem("itemCart", JSON.stringify(localST));

      /*If order quantity array length is0 that means there is no items in cart
      so we need ti show noItems div */
      if (this.orderQuantity.length == 0) this.noItems = true;


      /*If  user is logged then call the server*/
      if (this.UserLoggedIn) {


      this.postSer.changeValues("https://online-shop-node1.herokuapp.com/changeValues", data2)
        .subscribe((b:any)=> console.log("Removed"))
        }
        return
      };


    /* user is not logged and quantity is more than 0, change data in local storage*/
    if (!this.UserLoggedIn) {
      const localST = JSON.parse(localStorage.getItem('itemCart') || '{}');
      localST[i].orderQuantity = this.orderQuantity[i];
      localStorage.setItem("itemCart", JSON.stringify(localST));
    } else {
      this.postSer.changeValues("https://online-shop-node1.herokuapp.com/changeValues", data2)
      .subscribe((b:any)=> console.log(b))
    }

  }


  ngOnDestroy(): void {
    this.Subscription.unsubscribe()
  }

}
