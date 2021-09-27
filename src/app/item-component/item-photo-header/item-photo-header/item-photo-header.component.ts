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

  onMouseEnter(i:any) {
    this.photo = this.dataPhotos[i];
    this.active = i;
  }
  setActivePhoto() {
    if(this.dataPhotos != undefined)
      this.photo = this.dataPhotos[this.active]
    console.log(this.dataPhotos)
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.setActivePhoto()

  }
}
