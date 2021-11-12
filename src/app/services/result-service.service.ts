import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultServiceService {

  constructor(private router: Router) {
  }
 /**********************SERVICE FOR SETTING ALL SERVER RESPONSES IN OBSERVABLE AND ALSO WHEN THERE IS NO ITEMS BOOLEAN******************************************** */
  /*All items values from server*/
  private resultAll = new BehaviorSubject<any[]>([]);
  statusResultAll = this.resultAll.asObservable();

  /*route params*/
  private stringVal = new BehaviorSubject<string| any>("");
  statusStringVal = this.stringVal.asObservable();

  /*search Input Val value*/
  private searchInputVal = new BehaviorSubject<string| any>("");
  statusSearchInputVal = this.searchInputVal.asObservable();

  /*categories*/
  private categories = new BehaviorSubject<string| any[]>([]);
  categoriesResult = this.categories.asObservable();

  /*No items boolean change */
  private noItems = new BehaviorSubject<boolean>(false);
  statusNoItems = this.noItems.asObservable();


  changeValueAll(value:any[]): void{
    this.resultAll.next(value)
  }

  changeStringValue(value:string): void{
    this.stringVal.next(value)
  }

  setCategories(value:any[]): void{
    this.categories.next(value)
  }

  setSearchInputVal(value: string): void{
    this.searchInputVal.next(value)
  }

  /*Changeno items status*/
  setNoItems(value: boolean): void{
    this.noItems.next(value)
  }

}
