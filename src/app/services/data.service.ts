import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, Pipe } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppError } from '../commonErrors/app-error';
import { NotFoundError } from '../commonErrors/not-found-error';
import { ErrorError } from '../commonErrors/error-error';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getAll(url: string): any{
    return this.http.get(url, {observe: 'body', responseType: 'json'})
      .pipe(
        catchError(this.handleError)
      )
  }

  create(url:string, resource:{ title: string }): any{
    return this.http.post(url, resource).pipe(
      // map((response: any) => response.json()),
      catchError(this.handleError))
  }

  update(url:string, id: number ): any{
    return this.http.patch(url + '/' + id, JSON.stringify({ isRead: true })).pipe(
      // map((response: any) => response.json()),
      catchError(this.handleError)
    )
    //this.http.put(this.url, JSON.stringify(item))
  }

  delete(url:string, id:number): any{
    return this.http.delete(url + '/' + id).pipe(
      // map((response: any) => response.json()),
      catchError(this.handleError)
    )
  }

  /*GET ONE ITEM */

  getItem(url:string, resource:{ param1: string, param2:string, param3: number }): any{
    return this.http.post(url, resource).pipe(
      // map((response: any) => response.json()),
      catchError(this.handleError))
  }
  /*GET SEARCH ITEM */

  searchItems(url:string, resource:{ letter: string }): any{
    return this.http.post(url, resource).pipe(
      // map((response: any) => response.json()),
      catchError(this.handleError))
  }

  /*GET ONE ITEM END */

  /*GET ALL OR SEARCH FILTER ITEMS */

  searchFilterItems(url:string, resource:{title:any[], value: string }): any{
    return this.http.post(url, resource).pipe(
      // map((response: any) => response.json()),
      catchError(this.handleError))
  }

  /*GET ALL OR SEARCH FILTER ITEMS END */

  /*Filter method with params */
  getFilter(url: string, resource: { title: any[] }): any{
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*'
    }

    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };

    return this.http.post(url, resource, requestOptions)
      .pipe(
      // map((response: any) => response.json()),
      catchError(this.handleError))
  }

  /*LOOGIN*/
  logIn(url:string, resource:{username:string, password:string }): any{
    return this.http.post(url, resource).pipe(
      // map((response: any) => response.json()),
      catchError(this.handleError))
  }

  /*SIGN UP*/
  signUp(url:string, resource:{}): any{
    return this.http.post(url, resource).pipe(
      // map((response: any) => response.json()),
      catchError(this.handleError))
  }
  /*checkUsername*/
  checkUsername(url:string, resource:{value:string}): any{
    return this.http.post(url, resource).pipe(
      // map((response: any) => response.json()),
      catchError(this.handleError))
  }
  /*checkEmail*/
  checkEmail(url:string, resource:{value:string}): any{
    return this.http.post(url, resource).pipe(
      // map((response: any) => response.json()),
      catchError(this.handleError))
  }


  //SET ITEM IN CART
  setToCart(url:string, resource:{ user:string, id:number, item:any, quantity: number }): any{
    return this.http.post(url, resource).pipe(
      // map((response: any) => response.json()),
      catchError(this.handleError))
  }
  //GET ITEMs FROM CART
  getFromCart(url:string, resource:{ user:string, id:number }): any{
    return this.http.post(url, resource).pipe(
      // map((response: any) => response.json()),
      catchError(this.handleError))
  }
  //CHANGe VALUES
  changeValues(url:string, resource:{ catId:number, id:number, quantity:number, prodId:number, status:string }): any{
    return this.http.post(url, resource).pipe(
      // map((response: any) => response.json()),
      catchError(this.handleError))
  }



  private handleError(_error: Response): any{
    if (_error.status === 400) {
          return throwError(new ErrorError())
        }
    if (_error.status === 404) {
          return throwError(new NotFoundError());

        }
        return throwError(new AppError());
  }
}
