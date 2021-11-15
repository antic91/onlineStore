import { ResultServiceService } from 'src/app/services/result-service.service';
import { PostService } from './../services/post.service';
import { Component, Input, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageServiceService } from '../services/storage-service.service';
import { map } from 'rxjs/operators';
import { trigger, transition, useAnimation, state, style, animate } from '@angular/animations';
import { fadeIn, slideAnim } from '../animations/animations';

@Component({
  selector: 'app-common-category',
  templateUrl: './common-category.component.html',
  styleUrls: ['./common-category.component.css'],
  animations: [
    trigger('SlideIn', [
      transition(':enter', [
        useAnimation(slideAnim, {
          params: {
            opacity1: 0,
            opacity2: 1,
            time: '500ms ease-in',
            translateValue: 'translate3d',
            translateValue1: 'translate3d',
            translate1: '100%',
            translate2: '0',
            translate3: '0',
            translate4: '0',
            translate5: '0',
            translate6: '0'
          }
        })
      ]),
      transition(':leave', [
        useAnimation(slideAnim, {
          params: {
            opacity1: 1,
            opacity2: 0,
            time: '500ms ease-in',
            translateValue: 'translate3d',
            translateValue1: 'translate3d',
            translate1: '0',
            translate2: '0',
            translate3: '0',
            translate4: '100%',
            translate5: '0',
            translate6: '0'
          }
        })
      ])
    ]),
    trigger('SlideInOne', [
      transition(':enter', [
        useAnimation(slideAnim, {
          params: {
            opacity1: 0,
            opacity2: 1,
            time: '500ms ease-in',
            translateValue: 'translate3d',
            translateValue1: 'translate3d',
            translate1: '100%',
            translate2: '0',
            translate3: '0',
            translate4: '0',
            translate5: '0',
            translate6: '0'
          }
        })
      ]),
      transition(':leave', [
        useAnimation(slideAnim, {
          params: {
            opacity1: 1,
            opacity2: 0,
            time: '500ms ease-in',
            translateValue: 'translate3d',
            translateValue1: 'translate3d',
            translate1: '0',
            translate2: '0',
            translate3: '0',
            translate4: '100%',
            translate5: '0',
            translate6: '0'
          }
        })
      ])
    ]),

    trigger('slideInOptions', [
      state('false', style({ opacity: '1', transform: 'translate3d(-100%, 0, 0)' })),
      state('true', style({ opacity: '1', transform: 'translate3d(0, 0, 0)' })),
      transition('false => true', animate('500ms ease-in')),
      transition('true => false', animate('500ms ease-out'))
    ]),
    trigger('fadeIn',[
      transition(':enter', [
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

export class CommonCategoryComponent implements OnInit {

  /*Opacity fade in on start*/
  ShowDataCommon: boolean = false;


  /*route parameter for talk with server*/
  routeParam!: string;
  /*Route parameter to be shown*/
  param!: string;

  /*Show or hide bollean for smaller filter*/
  showHide: boolean = false;

  /*Show or hide animation filter button*/
  showHide1: boolean = true;

  clicked: boolean = false;

  constructor(private route: ActivatedRoute, private post: PostService, private storage: StorageServiceService, private result: ResultServiceService) { }


  ngOnInit() {

      this.route.paramMap.subscribe((params:any) => {
        this.routeParam = params.get('cat_name');
        this.getData()
        this.ShowDataCommon = true;
        /*resetting observable*/
        this.result.changeValueAll([])
        });

  }


  getData() {
    this.post.getAll("https://online-shop-node1.herokuapp.com/" + this.routeParam)
      .pipe(
        map((res:any)=>res.result)
      )
      .subscribe((arg: any) => {
        if (arg.length > 0) {
          this.param = arg[0].cat_title
          this.result.setNoItems(false);
          this.result.changeValueAll(arg);
        }
        else {
          this.result.setNoItems(true);
        }
    });
  }

  gettinRoute(event: any) {
    this.param = event;
  }
  getStatus(event: any) {
    if (event == "clicked") this.clicked = true;
      this.showHide = !this.showHide
      this.showHide1 = !this.showHide1
      setTimeout(() => {
        this.clicked = false;
      }, 500);
  }

  /*Function for showing or hiding filter option for smaller devices and setting animations trigger*/
  showHideFilter($event: any): void {

    $event.stopPropagation();
    $event.stopImmediatePropagation();

    this.showHide = !this.showHide;
    this.showHide1 = !this.showHide1;
  }

  /*on resize close smaller filter options*/
  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.showHide = false;
    this.showHide1 = true;
  }

}
