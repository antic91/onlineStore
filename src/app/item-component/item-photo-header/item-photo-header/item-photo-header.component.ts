import { DataService } from './../../../services/data.service';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-item-photo-header',
  templateUrl: './item-photo-header.component.html',
  styleUrls: ['./item-photo-header.component.css']
})
export class ItemPhotoHeaderComponent implements OnInit {
  @Input("itemHeader") dataHeader!: string;
  @Input("itemPhotos") dataPhotos!: any[];
  active: number = 0;
  photo!: string;
  constructor() {

  }

  ngOnInit(): void {
  }

  /*On event change photo with index from ng-for*/
  onMouseEnter(i:any) {
    this.photo = this.dataPhotos[i];
    this.active = i;
  }

  /*in ngOnInit dataPhotos is undefined, because of that we are watching for changes
  and in ngOnChanges we are calling this function to set active photo.
  Active photo is by default first photo of array*/
  setActivePhoto() {
    if(this.dataPhotos != undefined)
      this.photo = this.dataPhotos[this.active]
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setActivePhoto()
  }
}
