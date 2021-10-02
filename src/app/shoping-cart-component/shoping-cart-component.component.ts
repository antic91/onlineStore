import { PostService } from './../services/post.service';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { LogedInService } from '../services/loged-in.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-shoping-cart-component',
  templateUrl: './shoping-cart-component.component.html',
  styleUrls: ['./shoping-cart-component.component.css']
})
export class ShopingCartComponentComponent implements OnInit {
  data: any[] = [];
  orderQuantity: any[] = [];
  param1: string = "Home";
  param2: string = "Shopping Cart";
  UserLoggedIn: boolean = false;
  user!: string;
  id!: number;
  totalPrice: number = 0;
  constructor(private loggedUser: LogedInService, private postSer: PostService) { }

  ngOnInit(): void {

    this.loggedUser.statusUser.subscribe((x: any) => {
      if(x){
        this.loggedUser.statusId.subscribe((y: any) => {
          this.getData(x, y);
          this.UserLoggedIn = true;
          this.user = x;
          this.id = y;
        })
      }
      if(!x){
        const localStData = JSON.parse(localStorage.getItem('itemCart') || '{}');
        if (localStData.length > 0) {
          localStData.forEach((element: any) => {
            this.totalPrice = this.totalPrice + (element.orderQuantity*element.item.prod_price)
            this.orderQuantity.push(element.orderQuantity);
            this.data.push(element.item);
          });
        }
      }
    })
  }
  getData(x: any, y: any): void{
    const data = {
      user: x,
      id: y
    };
    this.postSer.getFromCart("https://online-shop-node1.herokuapp.com/getFromCart", data)
      .subscribe((res: any) => {
        if (res.length > 0) {
          this.data = res.result;
          res.result.forEach((a: any) => {
            this.totalPrice = this.totalPrice + (a.item_quantity*a.prod_price)
            this.orderQuantity.push(a.item_quantity)
          })
        }
      });
  }

  addOneItem(item:any, i:number): void{
    this.orderQuantity[i]++;

    this.totalPrice = this.totalPrice + item.prod_price;

    let data1 = {
        catId: parseInt(item.cart_id),
        id: this.id,
        quantity: parseInt(this.orderQuantity[i]),
        prodId: parseInt(item.prod_id),
        status:"minus"
      }

    if (!this.UserLoggedIn) {
      const localST = JSON.parse(localStorage.getItem('itemCart') || '{}');
      localST[i].orderQuantity = this.orderQuantity[i];
      localStorage.setItem("itemCart", JSON.stringify(localST));
    } else {
      this.postSer.changeValues("https://online-shop-node1.herokuapp.com/changeValues", data1)
      .subscribe((b:any)=> console.log(b))
    }
  }
  removeOneItem(item: any, i: number): void{
    if (this.orderQuantity[i] == 0 || this.orderQuantity[i] == undefined) {
      return
    }

    this.orderQuantity[i]--;

    this.totalPrice = this.totalPrice - item.prod_price;

    let data2 = {
        catId: item.cart_id,
        id: this.id,
        quantity: this.orderQuantity[i],
        prodId: parseInt(item.prod_id),
        status:"minus"
      }

    if (this.orderQuantity[i] == 0) {
      this.orderQuantity.splice(i,1);
      this.data.splice(i, 1);
      const localST = JSON.parse(localStorage.getItem('itemCart') || '{}');
      localST.splice(i,1)
      localStorage.setItem("itemCart", JSON.stringify(localST));

      if (this.UserLoggedIn) {

      this.postSer.changeValues("https://online-shop-node1.herokuapp.com/changeValues", data2)
      .subscribe((b:any)=> console.log(b))
      }
      return
    };

    if (!this.UserLoggedIn) {
      const localST = JSON.parse(localStorage.getItem('itemCart') || '{}');
      localST[i].orderQuantity = this.orderQuantity[i];
      localStorage.setItem("itemCart", JSON.stringify(localST));
    } else {
      this.postSer.changeValues("https://online-shop-node1.herokuapp.com/changeValues", data2)
      .subscribe((b:any)=> console.log(b))
    }


  }
}
