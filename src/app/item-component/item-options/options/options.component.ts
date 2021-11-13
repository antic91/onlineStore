import { AppError } from './../../../commonErrors/app-error';
import { PostService } from 'src/app/services/post.service';
import { LogedInService } from 'src/app/services/loged-in.service';
import { Component, Input, OnInit } from '@angular/core';
import { ErrorError } from 'src/app/commonErrors/error-error';

@Component({
  selector: 'app-item-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class ItemOptionsComponent implements OnInit {
  @Input("options") optionsArr!: any[];
  @Input("price") price!: string;
  @Input("quantity") quantity!: string;
  @Input("itemOBJ") itemOBJ!: any;
  /*Default order quantity*/
  orderQuantity: number = 1;
  /*Title for add to cart button*/
  titleAdded: string = "Add to Cart";
  constructor(private loggedUser: LogedInService,private setCart: PostService) { }

  ngOnInit(): void {

  }

  /*Set order quantity to be added in cart minus and plus function*/
  minus() :void{
    if (this.orderQuantity > 0) this.orderQuantity--
  }
  plus() :void{
    this.orderQuantity++;
  }


  /*Addto cart function*/
  addToCart() {
    /*Checking if the user is logged, if not then set cart to local storage
    function setLocalStorage(). If user is logged then get user id and pass it together
    with username to setShopingCart() function to add items to database on server*/
    this.loggedUser.statusUser.subscribe((x: any) => {
      if (!x) {
        this.setLocalStorage()
      }
      if (x) {
        this.loggedUser.statusId.subscribe((y: any) => {
          this.setShopingCart(x, y);
        })
      }
    })
  }

  /*Talking with server--- adding items to database*/
  setShopingCart(user:string, id:number): void{

    const data = {
      user: user,
      id: id,
      item: this.itemOBJ,
      quantity: this.orderQuantity,
    }

    this.titleAdded = "You added more items!"

    this.setCart.setToCart("https://online-shop-node1.herokuapp.com/setToCart", data)
      .subscribe((x: any) => {
        if (x.status == "OK") {
          this.titleAdded = "Add to Cart";
        }
      }, (error: AppError) => {
        if (error instanceof ErrorError) {
          console.log("ErrorError")
        }
        else throw error
      })
  }

  /*Set items to localserver if user is not logged...*/
  setLocalStorage(): void{
    let item = {
      item: this.itemOBJ,
      orderQuantity: this.orderQuantity
    };

    /*First check if the item is already there if not push new item*/
    var localSt = localStorage.getItem("itemCart");
    if (!localSt) {
      const arrToPushItems = [item];
      localStorage.setItem("itemCart", JSON.stringify(arrToPushItems));
    }
    /* if item is there then parse array from json object
    filter array to add new quantity to item.*/
    if (localSt) {
      const localStArray = JSON.parse(localStorage.getItem('itemCart') || '{}');
      var status;

      localStArray.filter((x: any) => {
        if (x.item.prod_title == item.item.prod_title) {
          status = true;

            x.orderQuantity = x.orderQuantity + item.orderQuantity;

        } else {
          status = false;
        }
      })

      /*When finished then if there is no item then push it to array, remove products
      from local storage and then set new array to local storage*/
      if (!status) {
        localStArray.push(item)
        localStorage.removeItem("itemCart")
        localStorage.setItem("itemCart", JSON.stringify(localStArray));
      } /*Else just remove item and set new array to local storage*/
      else {
        localStorage.removeItem("itemCart")
        localStorage.setItem("itemCart", JSON.stringify(localStArray));
      }

    }
  }
}
