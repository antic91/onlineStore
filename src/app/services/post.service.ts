import { DataService } from './data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PostService extends DataService{

  /*Reusable service////// talking with server*/

  constructor(http: HttpClient, private router:ActivatedRoute) {
    super(http);
  }
   /*GET ONE ITEM */

    getItem(url:string, resource:{ param1: string, param2:string, param3: number }): any{
      return this.http.post(url, resource).pipe(
        // map((response: any) => response.json()),
        catchError(this.handleError))
    }
  /************************************************************* */
  /*GET SEARCH ITEM */

    searchItems(url:string, resource:{ letter: string }): any{
      return this.http.post(url, resource).pipe(
        // map((response: any) => response.json()),
        catchError(this.handleError))
    }
  /*************************************************************/

   /*GET ALL OR SEARCH FILTER ITEMS */

    searchFilterItems(url:string, resource:{title:any[], value: string }): any{
      return this.http.post(url, resource).pipe(
        // map((response: any) => response.json()),
        catchError(this.handleError))
    }

  /*************************************************************/
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

  /*************************************************************/
  /*Login methode*/
    logIn(url:string, resource:{username:string, password:string }): any{
      return this.http.post(url, resource).pipe(
        // map((response: any) => response.json()),
        catchError(this.handleError))
    }
  /*************************************************************/
  /*Sign up*/
    signUp(url:string, resource:{}): any{
      return this.http.post(url, resource).pipe(
        // map((response: any) => response.json()),
        catchError(this.handleError))
    }
  /*************************************************************/

  /*check Username*/
    checkUsername(url:string, resource:{value:string}): any{
      return this.http.post(url, resource).pipe(
        // map((response: any) => response.json()),
        catchError(this.handleError))
    }
  /*************************************************************/

  /*check Email*/
    checkEmail(url:string, resource:{value:string}): any{
      return this.http.post(url, resource).pipe(
        // map((response: any) => response.json()),
        catchError(this.handleError))
    }
  /*************************************************************/

  //Set item to cart
    setToCart(url:string, resource:{ user:string, id:number, item:any, quantity: number }): any{
      return this.http.post(url, resource).pipe(
        // map((response: any) => response.json()),
        catchError(this.handleError))
    }
  /*************************************************************/

  //GET items from cart
    getFromCart(url:string, resource:{ user:string, id:number }): any{
      return this.http.post(url, resource).pipe(
        // map((response: any) => response.json()),
        catchError(this.handleError))
    }
  /*************************************************************/

  //Change values
    changeValues(url:string, resource:{ catId:number, id:number, quantity:number, prodId:number, status:string }): any{
      return this.http.post(url, resource).pipe(
        // map((response: any) => response.json()),
        catchError(this.handleError))
    }
  /*************************************************************/
}
