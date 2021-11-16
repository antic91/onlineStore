import { ResultServiceService } from 'src/app/services/result-service.service';
import { Injectable, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  /************************SERVICE FOR DETECTIG ROUTE CHANGE AND ALSO STORAGE CLICKED FILTER OPTIONS TI SEND IT TO SERVER**************************************** */

  data: any = [];
  constructor(private router: Router, private result: ResultServiceService) {
    /*Catching the route change*/
    this.router.events.subscribe((event: any) => {

      if (event.url) {
        this.routeChangeDetection()
      }

      /*If router url is not === to result or allProducts component reset stringValue*/
      if (event.url != "/result" && event.url != "/allProducts" && event.url != undefined) {
        this.result.changeStringValue("")
      }

    });
  }
  /*On every route change reset data array*/
  routeChangeDetection() {
    this.data = [];
  }

}
