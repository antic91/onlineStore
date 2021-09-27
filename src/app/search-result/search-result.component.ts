import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ResultServiceService } from '../services/result-service.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  objectData!: any[];
  objectCat!: any[];

  constructor(private result: ResultServiceService, private router: Router) {
    this.router.events
    .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
    .subscribe(event => {
      if (event.id === 1 && event.url === event.urlAfterRedirects) {
        this.router.navigate(['/home']);
      }
    })
  }

  ngOnInit(): void {
    console.log("dada")
    this.result.statusResult.subscribe((x: any) => {
      this.objectData = x;
      this.result.categoriesResult.subscribe((x: any) => this.objectCat = x)
    })
  }

}
