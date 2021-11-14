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

  /*We dont need this 3 inputs no more, but i will leave it.. it was used here in component.
  I haven't made directive right on the beginning for adding items to cart... now all logic we do there in directive*/
  @Input("options") optionsArr!: any[];
  @Input("price") price!: string;
  @Input("quantity") quantity!: string;

  /*object to be sent to directive*/
  @Input("itemOBJ") itemOBJ!: any;


  /*Default order quantity to be sent to directive*/
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

}
