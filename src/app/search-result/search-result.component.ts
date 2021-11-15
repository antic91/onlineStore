import { trigger, transition, useAnimation, state, style, animate } from '@angular/animations';
import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { fadeIn, slideAnim } from '../animations/animations';
import { ResultServiceService } from '../services/result-service.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
    animations: [
    trigger('SlideIn', [
      transition(':enter',[
        useAnimation(slideAnim,{
          params:{
            opacity1:0,
            opacity2:1,
            time:'500ms ease-in',
            translateValue:'translate3d',
            translateValue1:'translate3d',
            translate1:'100%',
            translate2:'0',
            translate3:'0',
            translate4:'0',
            translate5:'0',
            translate6:'0'
          }
        })
      ]),
      transition(':leave',[
        useAnimation(slideAnim,{
          params:{
            opacity1:1,
            opacity2:0,
            time:'500ms ease-in',
            translateValue:'translate3d',
            translateValue1:'translate3d',
            translate1:'0',
            translate2:'0',
            translate3:'0',
            translate4:'100%',
            translate5:'0',
            translate6:'0'
          }
        })
      ])
    ]),
    trigger('SlideInOne', [
      transition(':enter',[
        useAnimation(slideAnim,{
          params:{
            opacity1:0,
            opacity2:1,
            time:'500ms ease-in',
            translateValue:'translate3d',
            translateValue1:'translate3d',
            translate1:'100%',
            translate2:'0',
            translate3:'0',
            translate4:'0',
            translate5:'0',
            translate6:'0'
          }
        })
      ]),
      transition(':leave',[
        useAnimation(slideAnim,{
          params:{
            opacity1:1,
            opacity2:0,
            time:'500ms ease-in',
            translateValue:'translate3d',
            translateValue1:'translate3d',
            translate1:'0',
            translate2:'0',
            translate3:'0',
            translate4:'100%',
            translate5:'0',
            translate6:'0'
          }
        })
      ])
    ]),

    trigger('slideInOptions', [
      state('false', style({ opacity:'1', transform:'translate3d(-100%, 0, 0)'})),
      state('true', style({ opacity:'1', transform:'translate3d(0, 0, 0)'})),
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
export class SearchResultComponent implements OnInit {


    /*I made this Component while I wanted to make other design, but at the end i
  leaved it like all other categories and it is possible to leave all and search
  result component together with common categories component . The Style(css) and HTML
  are the same right now but its possible to change it !*/

    /*watch width of element*/
  @ViewChild('searchWrapper', { read: ElementRef }) searchWrapper!: ElementRef;

  /*Opacity fade in on start*/
  ShowDataSearch: boolean = false;

  routeParam: string = "Search results";

  /*Show or hide bollean for smaller filter*/
  showHide: boolean = false;

  /*Show or hide animation filter button*/
  showHide1: boolean = true;

  clicked: boolean = false;

  Subscription!: Subscription;

  objectData!: any[];
  objectCat!: any[];

  constructor(private result: ResultServiceService, private router: Router) {
    this.router.events
    .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
    .subscribe(event => {
      if (event.id === 1 && event.url === event.urlAfterRedirects) {
        this.router.navigate(['/home']);
      }
    })
  }

  ngOnInit(): void {
    this.Subscription = this.result.statusResultAll.subscribe((x: any) => {
      this.objectData = x;
      this.result.categoriesResult.subscribe((x: any) => this.objectCat = x);
      this.ShowDataSearch = true;
    })
  }


    /*Catching filterbutton click event*/
  filterClicked(event:any) {
    if (event == "clicked") this.clicked = true;
      this.showHide = false;
      this.showHide1 = true;
      setTimeout(() => {
        this.clicked = false;
      }, 500);
  }

  /*Function for showing or hiding filter option for smaller devices and setting animations trigger*/
  showHideFilter($event: any): void {
      this.showHide = !this.showHide;
      this.showHide1 = !this.showHide1;
  }

  ngOnDestroy(): void {
    if(this.Subscription != undefined) this.Subscription.unsubscribe()
  }

  /*on resize close smaller filter options*/
    @HostListener('window:resize', ['$event'])
    onResize(event:any) {
      if (this.searchWrapper.nativeElement.clientWidth >= 820) {
        this.showHide = false;
        this.showHide1 = true;
      }
    }
}
