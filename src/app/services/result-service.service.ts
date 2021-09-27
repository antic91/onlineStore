import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultServiceService {

  constructor(private router: Router) {
    /*this.router.events.subscribe((event:any) => {
    if(event.url) {
        this.routeChangeDetection()
    }
    });*/
  }
  private result = new BehaviorSubject<number| any[]>([]);
  statusResult = this.result.asObservable();


  private resultAll = new BehaviorSubject<number| any[]>([]);
  statusResultAll = this.resultAll.asObservable();

  private stringVal = new BehaviorSubject<number| string>("");
  statusStringVal = this.stringVal.asObservable();

  private categories = new BehaviorSubject<number| any[]>([]);
  categoriesResult = this.categories.asObservable();

  changeValue(value:any[]): void{
    this.result.next(value)
  }

  changeValueAll(value:any[]): void{
    this.resultAll.next(value)
  }

  changeStringValue(value:string): void{
    this.stringVal.next(value)
  }

  setCategories(value:any[]): void{
    this.categories.next(value)
  }

 /* routeChangeDetection() {
    this.stringVal.next("");
    this.result.next([]);
  } */
}
