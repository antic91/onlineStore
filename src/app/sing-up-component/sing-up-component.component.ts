import { trigger, transition, useAnimation } from '@angular/animations';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { fadeIn } from '../animations/animations';

@Component({
  selector: 'app-sing-up-component',
  templateUrl: './sing-up-component.component.html',
  styleUrls: ['./sing-up-component.component.css'],
  animations: [
    trigger('fadeIn',[
      transition(':enter', [
        useAnimation(fadeIn, {
          params: {
            opacity1: 0,
            opacity2: 1,
            time:'500ms ease-in'
          }
        })
      ]),
      transition(':leave', [
        useAnimation(fadeIn, {
          params: {
            opacity1: 0,
            opacity2: 1,
            time:'500ms ease-in'
          }
        })
      ])
    ])
  ]
})
export class SingUpComponentComponent implements OnInit {

  /* display init. on start*/
  DisplayInit: boolean = false;
  /*Emiting value when we to hide some log in component elements.*/
  displayHide!: boolean;

  constructor() { }

  ngOnInit(): void {
    this.DisplayInit = true;
    this.displayHide = false;
  }

  ngOnDestroy(): void {
    this.displayHide = true;
  }
}
