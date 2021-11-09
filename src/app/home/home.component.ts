import { trigger, transition, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../animations/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        useAnimation(fadeIn, {
          params: {
            opacity1: 0,
            opacity2: 1,
            time: '600ms ease-in'
          }
        })
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  /*Display banner condition*/
  displayBanner: boolean = false;


  constructor() { }

  ngOnInit(): void {
    /*Display banner on init*/
    this.displayBanner = true;
  }

}
