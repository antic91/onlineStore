import { LogedInService } from 'src/app/services/loged-in.service';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loaded1: boolean = false;
  title: string = "onlineStore";

  constructor(private loaded: LogedInService) {

  }

  ngOnInit(): void {
    this.loaded.statusLoaded.subscribe((x: any) => {
      setTimeout(() => {

      }, 2000);
    })
  }

}
