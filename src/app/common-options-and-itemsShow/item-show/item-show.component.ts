import { PostService } from 'src/app/services/post.service';
import { Component, Input, OnInit, Output, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ResultServiceService } from 'src/app/services/result-service.service';
import { StorageServiceService } from 'src/app/services/storage-service.service';
import { finalize, map, take } from 'rxjs/operators';
import { trigger, transition, useAnimation, animate, state, style } from '@angular/animations';
import { fadeIn } from 'src/app/animations/animations';

@Component({
  selector: 'app-item-show',
  templateUrl: './item-show.component.html',
  styleUrls: ['./item-show.component.css'],
  animations: [
    trigger('fadeIn',[
      transition(':enter', [
        useAnimation(fadeIn, {
          params: {
            opacity1: 0,
            opacity2: 1,
            time:'300ms 350ms ease-in'
          }
        })
      ]),
      transition(':leave', [
        useAnimation(fadeIn, {
          params: {
            opacity1: 1,
            opacity2: 0,
            time:'300ms ease-in'
          }
        })
      ])
    ]),
    trigger('fadeInDelay',[
      transition(':enter', [
        useAnimation(fadeIn, {
          params: {
            opacity1: 0,
            opacity2: 1,
            time:'300ms 700ms ease-in'
          }
        })
      ]),
      transition(':leave', [
        useAnimation(fadeIn, {
          params: {
            opacity1: 1,
            opacity2: 0,
            time:'300ms ease-in'
          }
        })
      ])
    ])
  ]
})
export class ItemShowComponent implements OnInit {

  /*Component for items in products categories components.... here we are taking data from observable(Result-service)*/////////////////////////////////////////////////////

  @ViewChild("element",{read: ElementRef}) element!: ElementRef;

  /*clicked event filter button*/
  @Input("clicked") clicked!: boolean;

  /*Number to start splice*/
  i: number = 0;

  numToAdd!: number;

  /*Display no items header*/
  noItemsDisplay: boolean = false;

  objects: any[] = [];
  objectsToShow: any[] = [];

  /*Value of route can be result or allItems*/
  value!: string;

  /*route param to speak with server*/
  routeParam!: string;

  constructor(private PostService: PostService, private route: ActivatedRoute, private result: ResultServiceService, private router: Router, private storage: StorageServiceService) {

  }



  ngOnInit() {
    this.showData();
    /*Getting status of  noItems boolean from result service*/
    this.result.statusNoItems.subscribe(x => {
      this.noItemsDisplay = x;
    });
  }

  /*Function for setting data ******************************/
  showData(): void {
    /*Reseting i on every data change*/
    this.i = 0;
    if (window.innerWidth >= 1401) {
      this.numToAdd = 9;
    } else {
      this.numToAdd = 8;
    }
    //if (this.value == "allProducts") {
    this.result.statusResultAll
      .subscribe((x: any[]) => {
        /*Setting object and calling a function */
        this.objects = x;
        this.setDataToShow()
      })
  }


/*Checking are there products in object.. if true then we slice items to show*/
  setDataToShow() {
    if (this.objects.length > 0) {
      this.objectsToShow = this.objects.slice(this.i, this.i + this.numToAdd);
      this.i = this.i + this.numToAdd;
    }
  }


  /*on click button Show more**************calling this function to add more items AllProducts and Result of search component*/
  showMore() {
    /*If length of two objects is the same.. then return*/
    if (this.objectsToShow.length == this.objects.length) return

    if (this.objects.length > this.i+this.numToAdd) {
      this.objectsToShow = this.objectsToShow.concat(this.objects.slice(this.i, this.i + this.numToAdd));
      this.i = this.i + this.numToAdd;
    } else {
      this.objectsToShow= this.objectsToShow.concat(this.objects.slice(this.i, this.objects.length))
    }

  }

  /*Detecting filter changes */
  ngOnChanges(changes: SimpleChanges): void {
    /*On filter click reset objects and call function showData*/
    if (this.clicked== true) {
        this.objects = [];
        this.objectsToShow = [];
        this.showData()
    }
  }

}
