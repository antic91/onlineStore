import { Router, ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-options',
  templateUrl: './search-options.component.html',
  styleUrls: ['./search-options.component.css']
})
export class SearchOptionsComponent implements OnInit {
  @Input("object") object!: any[];
  @Output("setValue") value = new EventEmitter()
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  navigate(item: any): void{
    this.router.navigate(["categories", item.cat_slug, item.prod_slug, item.prod_id]);
    this.object = [];
    this.value.emit("")
    //this.router.navigateByUrl("categories/" + item.cat_slug + "/" +item.prod_slug + "/" + item.prod_id,{ skipLocationChange: true });
  }
}
