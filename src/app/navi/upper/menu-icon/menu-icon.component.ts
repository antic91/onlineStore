import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { fadeIn, rotateAnimation, rotateAnimationSec } from 'src/app/animations/animations';

@Component({
  selector: 'app-menu-icon',
  templateUrl: './menu-icon.component.html',
  styleUrls: ['./menu-icon.component.css'],
  animations: [
    rotateAnimation.animeTrigger,
    rotateAnimationSec.animeTrigger,
    trigger('fadeInAnimation', [
      transition(':enter', [
        useAnimation(fadeIn, {
          params: {
            opacity1: 0,
            opacity2: 1,
            time: '400ms ease-in'
          }
        })
      ]),
      transition(':leave', [
        useAnimation(fadeIn, {
          params: {
            opacity1: 1,
            opacity2: 0,
            time: '400ms ease-in'
          }
        })
      ]),
    ])
  ]
})
export class MenuIconComponent implements OnInit {

  @Input('displayX') displayX: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
