import { LogedInService } from 'src/app/services/loged-in.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';
import { PostService } from '../services/post.service';
import { ResultServiceService } from '../services/result-service.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  objects: any[] = [];
  show: boolean = false;
  condition: boolean = true;
  constructor(private http: HttpClient, private service: PostService,private resultSer: ResultServiceService,private load: LogedInService) { }

  ngOnInit(): void {
    this.service.getAll("https://online-shop-node1.herokuapp.com/")
      .pipe(
        map((res:any)=> res.results)
      )
      .subscribe((arg: any) => {
        this.objects = arg;
        this.resultSer.setCategories(this.objects)
        this.load.setLoaded(true)
      });
  }

  changeTrue(event: any) {
    if(event == "true"){
      this.show = true;
    }
    setTimeout(() => {
      if(event == "false" && this.condition){
        this.show = false;
      }
    }, 500);
  }
  closeDropDown(event: any) {
    if(event == "false"){
      this.show = false;
      this.condition = true;
    }
    if(event == "true"){
      this.show = true;
      this.condition = false;
    }
  }

}
