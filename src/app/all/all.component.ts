import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ResultServiceService } from '../services/result-service.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {
  clicked: boolean = false;
  objectData!: any[];
  objectCat!: any[];

  constructor(private result: ResultServiceService,private route: ActivatedRoute, private service: PostService) { }

  ngOnInit(): void {
    this.route.url.subscribe((x: any) => {
      console.log(x[0].path)
      this.result.changeStringValue(x[0].path);
    })
    this.service.getAll("https://online-shop-node1.herokuapp.com/all")
      .pipe(
        map((x:any)=> x = x.result)
      )
      .subscribe((x: any) => {
        if (x.length > 0) {
          this.result.changeValueAll(x)
          this.result.categoriesResult.subscribe((x:any)=> this.objectCat = x)
        }
    })
  }
  filterClicked(event:any) {
    if (event == "clicked") this.clicked = true;
      setTimeout(() => {
        this.clicked = false;
      }, 500);
    }
}
