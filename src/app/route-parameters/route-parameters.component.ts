import { trigger, transition, useAnimation } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { fadeIn } from '../animations/animations';

@Component({
  selector: 'app-route-parameters',
  templateUrl: './route-parameters.component.html',
  styleUrls: ['./route-parameters.component.css'],
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
export class RouteParametersComponent implements OnInit {
  @Input('routeParam') routeParam!: string;
  @Input('parToShow') parToShow!: string;
  @Input('slug') cat_slug!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
