import { LogedInService } from './../../services/loged-in.service';
import { PostService } from './../../services/post.service';
import { Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ResultServiceService } from 'src/app/services/result-service.service';

@Component({
  selector: 'app-upper',
  templateUrl: './upper.component.html',
  styleUrls: ['./upper.component.css']
})
export class UpperComponent implements OnInit {
  @ViewChild('inp', {static: true}) inputEl!: ElementRef;
  object!: any[];
  value!: string;
  showLogIn: boolean = false;
  userLogged!: boolean;
  constructor(private loggedIn: LogedInService, private service: PostService, private router: Router, private result: ResultServiceService) {
    this.router.events.subscribe((event) => {
      this.inputEl.nativeElement.value = "";
      this.object = []
    })
  }
  ngOnInit(): void {
  }
  pressed($event: any) {
    if ($event.key == "Enter") {
      this.navigate();
      return;
    }
    if ($event.target.value == "") {
      this.object = [];
      return;
    }
    if ($event.target.value.trim() == "") {
      this.object = [];
      return;
    }
    this.service.searchItems("https://online-shop-node1.herokuapp.com/search", { letter: $event.target.value })
      .pipe(
        map((res:any)=>res.result)
      )
      .subscribe((x: any[]) => {
        this.setObjects(x,$event.target.value);
      })
  }
  setObjects(x: any[],val: string): void{
    this.object = x;
    this.value = val;
  }
  setNewValue(event: string) {
    this.inputEl.nativeElement.value = event;
  }
  navigate(): void{
    this.inputEl.nativeElement.value = "";
    this.inputEl.nativeElement.blur();
    this.result.changeValue(this.object);
    this.result.changeStringValue(this.value);
    this.object = [];
    this.router.navigate(['/result']);
    this.object = [];
  }

  /*SHOWING LogIN */
  onMouseOver() {
    this.loggedIn.statusLogged.subscribe((x: any) => this.userLogged = x);
    this.showLogIn = true;
  }
  onMouseLeave() {
    this.loggedIn.statusLogged.subscribe((x: any) => this.userLogged = x);
    this.showLogIn = false;
  }

}
