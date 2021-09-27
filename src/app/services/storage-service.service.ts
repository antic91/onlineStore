import { Injectable, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {
  data: any = [];
  constructor(private router: Router) {
    this.router.events.subscribe((event:any) => {
    if(event.url) {
        this.routeChangeDetection()
    }
    });
  }

  routeChangeDetection() {
    this.data = [];
  }
}
