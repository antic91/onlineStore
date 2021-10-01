import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { PostService } from 'src/app/services/post.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  @Input("filter") filter!: boolean;

  routeParam!: string;
  parameterRoute!: string;

  @Output("changingRoute") parameter = new EventEmitter;
  objects: any = [];
  objectsToShow: any = [];

  constructor(private route: ActivatedRoute, private PostService: PostService, private storage: StorageServiceService) { }



  ngOnInit() {
    this.route.paramMap.subscribe((params:any) => {
      this.routeParam = params.get('cat_name');
      this.getData()
    });

  }



  getData() {
    this.PostService.getAll("https://online-shop-node1.herokuapp.com/" + this.routeParam)
      .pipe(
        map((res:any)=>res.result)
      )
      .subscribe((arg: any) => {
        this.objects = arg;
        this.objectsToShow = this.objects.splice(0, 9)
        this.parameterRoute = this.objectsToShow[0].cat_metaTitle;
        this.changingRoute()
    });
  }


  changingRoute() {
    this.parameter.emit(this.parameterRoute)
  }


  showMore() {
    if (this.objects.length > 8) {
      this.objectsToShow= this.objectsToShow.concat(this.objects.splice(0, 9))
    } else {
      this.objectsToShow= this.objectsToShow.concat(this.objects.splice(0, this.objects.length))
    }
  }



  getNewData() {
    let x = this.storage.data.map((item: any) => item.route).indexOf(this.routeParam);
    if (x == -1) {
      this.storage.data.push(
        { route: this.routeParam }
      );
    }
    this.PostService.getFilter("https://online-shop-node1.herokuapp.com/filter", { title: this.storage.data })
      .pipe(
        map((res:any)=>res.data)
      )
      .subscribe((x: any) => {
        this.objects = x;
        this.objectsToShow = this.objects.splice(0, 9)
        this.parameterRoute = this.objectsToShow[0].cat_metaTitle;
      })
  }


  /*Detecting filter changes */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.filter.currentValue == true) {
      this.getNewData()
    }
  }
}
