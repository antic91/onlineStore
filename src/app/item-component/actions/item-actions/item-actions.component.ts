import { PostService } from './../../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-item-actions',
  templateUrl: './item-actions.component.html',
  styleUrls: ['./item-actions.component.css']
})
export class ItemActionsComponent implements OnInit {
  routeParam!: string;
  object!: any[];
  objectToShow!: any[];
  constructor(private route: ActivatedRoute, private service: PostService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:any) => {
      this.routeParam = params.get('cat_name');
      this.getData()
    });
  }
  getData(): void{
    this.service.getAll("https://online-shop-node1.herokuapp.com/" + this.routeParam)
      .pipe(
          map((res:any)=>res.result)
        )
      .subscribe((arg: any) => {
        this.object = arg;
        this.setDataToShow()
        });
  }
  setDataToShow(): void{
    this.objectToShow = this.object.splice(0, 4);
    setInterval(() => {
      this.object = this.object.concat(this.objectToShow);
      this.objectToShow = this.object.splice(0, 4);
    }, 10000);
  }


  /*Add to cart function*/
  addToBag(): void{

  }
}
