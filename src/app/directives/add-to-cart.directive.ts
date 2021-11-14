import { Directive, HostListener, Input } from '@angular/core';
import { AppError } from '../commonErrors/app-error';
import { ErrorError } from '../commonErrors/error-error';
import { LogedInService } from '../services/loged-in.service';
import { PostService } from '../services/post.service';

@Directive({
  selector: '[appAddToCart]'
})
export class AddToCartDirective {

  @Input("options") optionsArr: any[] = [];
  @Input("price") price!: string;
  @Input("quantity") quantity!: string;
  @Input("itemOBJ") itemOBJ!: any;
  @Input("orderQuantity") orderQuantity!: number;


  /*Title for add to cart button*/
  titleAdded: string = "Add to Cart";

  constructor(private loggedUser: LogedInService, private setCart: PostService) { }

  @HostListener('click', ['$event'])
  clickEvent(event:any) {
    event.preventDefault();
    event.stopPropagation();
    this.setData()
  }


  setData(){
    this.price = this.itemOBJ.prod_price;
    this.quantity = this.itemOBJ.prod_quantity;

    /*Set options array to be sent to a cart component and then call functions to set product in cart*/

    if (this.itemOBJ.cat_title == "Used Desktops" || this.itemOBJ.cat_title == "Used Laptops" || this.itemOBJ.cat_title == "New Laptops") {
          this.optionsArr.push(
            { name: "Hard Drive Type", spec: this.itemOBJ.spec_hddType },
            { name: "Storage space", spec: this.itemOBJ.spec_hdd },
            { name: "RAM size", spec: this.itemOBJ.spec_ram },
            { name: "Display size", spec: this.itemOBJ.spec_screen_size },
            { name: "Graphics card", spec: this.itemOBJ.spec_graphic_card },
            { name: "Color", spec: this.itemOBJ.spec_color },
            { name: "Keyboard layout", spec: this.itemOBJ.spec_keyboard_layout },
            { name: "Condition", spec: this.itemOBJ.spec_state }
          );
          this.addToCart();
        }
    if (this.itemOBJ.cat_title == "Smartphones" || this.itemOBJ.cat_title == "Tablets") {

      this.optionsArr.push(
        { name: "Storage space", spec: this.itemOBJ.spec_hdd },
        { name: "RAM size", spec: this.itemOBJ.spec_ram },
        { name: "Display size", spec: this.itemOBJ.spec_screen_size },
        { name: "Front camera", spec: this.itemOBJ.spec_front_camera },
        { name: "Back camera", spec: this.itemOBJ.spec_back_camera },
        { name: "Color", spec: this.itemOBJ.spec_color },
        { name: "Condition", spec: this.itemOBJ.spec_state }
      )
      this.addToCart();
    }
  }



  /*Add to cart function*/
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
  setShopingCart(user: string, id: number): void{
    console.log(this.optionsArr);
    console.log(this.price);
    console.log(this.quantity);
    console.log(this.itemOBJ);
    console.log(this.orderQuantity);

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
