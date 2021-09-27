import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-actions-home',
  templateUrl: './actions-home.component.html',
  styleUrls: ['./actions-home.component.css']
})
export class ActionsHomeComponent implements OnInit {
  saleObjects: any = [];
  constructor(private service: PostService, private http: HttpClient) { }

  ngOnInit(): void {
    this.service.getAll("https://online-shop-node1.herokuapp.com/home")
      .pipe(
        map((res:any)=> res.results)
      )
      .subscribe((res: any) => {
        this.saleObjects = res;
      });
  }
}
