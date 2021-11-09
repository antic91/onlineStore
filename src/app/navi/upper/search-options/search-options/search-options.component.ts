import { Router, ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ResultServiceService } from 'src/app/services/result-service.service';

@Component({
  selector: 'app-search-options',
  templateUrl: './search-options.component.html',
  styleUrls: ['./search-options.component.css']
})
export class SearchOptionsComponent implements OnInit {

  @Input("object") object!: any[];

  @Output("setValue") value = new EventEmitter()

  constructor(private router: Router, private route: ActivatedRoute, private result: ResultServiceService) { }

  ngOnInit(): void {
  }
  /*Navigate function and emmit empty string value to reset input value*/
  navigate(item: any): void{
    this.router.navigate(["categories", item.cat_slug, item.prod_slug, item.prod_id]);
    this.object = [];
    this.value.emit("")
    //this.router.navigateByUrl("categories/" + item.cat_slug + "/" +item.prod_slug + "/" + item.prod_id,{ skipLocationChange: true });
  }
}
