import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-best-items',
  templateUrl: './best-items.component.html',
  styleUrls: ['./best-items.component.css']
})
export class BestItemsComponent implements OnInit {
  title!: string;
  @Input("Param")Param!: string;
  object!: any[];
  objectToShow!: any[];
  constructor(private service: PostService) {}

  ngOnInit(): void {
    if (this.Param == 'smartphones') {
      this.title = 'Smartphones'
    }
    if (this.Param == 'usedLaptops') {
      this.title = 'Used laptops'
    }
    this.getData()
  }
  getData(): void{
    this.service.getAll("https://online-shop-node1.herokuapp.com/" + this.Param)
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
}
