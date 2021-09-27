import { PostService } from 'src/app/services/post.service';
import { LogedInService } from 'src/app/services/loged-in.service';
import { Component, Input, OnInit } from '@angular/core';

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
  orderQuantity: number = 1;
  titleAdded: string = "Add to Cart";
  constructor(private loggedUser: LogedInService,private setCart: PostService) { }

  ngOnInit(): void {

  }
  minus() :void{
    if (this.orderQuantity > 0) this.orderQuantity--
  }
  plus() :void{
    this.orderQuantity++;
  }
  addToCart() {
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
      })
  }

  setLocalStorage(): void{
      let item = {
          item: this.itemOBJ,
          orderQuantity: this.orderQuantity
      };
    var localSt = localStorage.getItem("itemCart");
      if (!localSt) {
        const arrToPushItems = [item];
        localStorage.setItem("itemCart", JSON.stringify(arrToPushItems));
      }
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
      if (!status) {
        localStArray.push(item)
        localStorage.removeItem("itemCart")
        localStorage.setItem("itemCart", JSON.stringify(localStArray));
      } else {
        localStorage.removeItem("itemCart")
        localStorage.setItem("itemCart", JSON.stringify(localStArray));
      }

    }
  }
}
