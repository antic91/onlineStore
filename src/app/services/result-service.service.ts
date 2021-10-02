import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultServiceService {

  constructor(private router: Router) {
  }
  private result = new BehaviorSubject<string| any[]>([]);
  statusResult = this.result.asObservable();


  private resultAll = new BehaviorSubject<string| any[]>([]);
  statusResultAll = this.resultAll.asObservable();

  private stringVal = new BehaviorSubject<string| any>("");
  statusStringVal = this.stringVal.asObservable();

  private categories = new BehaviorSubject<string| any[]>([]);
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

}
