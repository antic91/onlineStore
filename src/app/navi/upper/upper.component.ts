import { LogedInService } from './../../services/loged-in.service';
import { PostService } from './../../services/post.service';
import { Component, ElementRef, OnInit, Output, SimpleChanges, ViewChild, EventEmitter, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ResultServiceService } from 'src/app/services/result-service.service';

@Component({
  selector: 'app-upper',
  templateUrl: './upper.component.html',
  styleUrls: ['./upper.component.css']
})
export class UpperComponent implements OnInit {
  @ViewChild('inp', { static: true }) inputEl!: ElementRef;

  @ViewChild('iconsWrapper', { static: true }) iconsWrapper!: ElementRef;

  /*Emit status for login dropdown for smaller screens*/
  @Output('loginDrop') loginDrop = new EventEmitter<boolean>();

  /*Emit status for menu dropdown for smaller screens*/
  @Output('menuDrop') menuDrop = new EventEmitter<boolean>();


  @Input('displayX')displayX: boolean = false;

  /*Login dropdown for smaller*/
  @Input('LogInClicked')LogInClicked: boolean = false;

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

  /*Menu for smaller click event*/
  menuClicked() {
    this.menuDrop.emit(!this.displayX)
  }



/*Catching mouse event on search input */
  pressed($event: any) {
    /*If enter calling navigate function*/
    if ($event.key == "Enter") {
      this.navigate();
      return;
    }
/* if there is nothing in value return*/
    if ($event.target.value == "") {
      this.object = [];
      return;
    }
    if ($event.target.value.trim() == "") {
      this.object = [];
      return;
    }
/*Else call server to get the data*/
    this.service.searchItems("https://online-shop-node1.herokuapp.com/search", { letter: $event.target.value })
      .pipe(
        map((res:any)=>res.result)
      )
      .subscribe((x: any[]) => {
        this.setObjects(x,$event.target.value);
      })
  }


/*If server is called use this fuction to set data array and value */
  setObjects(x: any[],val: string): void{
    this.object = x;
    this.value = val;
  }

/*cathing clicked event on dropDown menu and resseting input value*/
  setNewValue(event: string) {
    this.inputEl.nativeElement.value = event;
    this.object = []
  }

/*on enter navigate */
  navigate(): void{
    this.inputEl.nativeElement.value = "";
    this.inputEl.nativeElement.blur();
    this.result.changeValue(this.object);
    this.result.changeStringValue(this.value);
    this.object = [];
    this.router.navigate(['/result']);
    this.object = [];
  }



  /*SHOWING LogIN absolute div*/
  onMouseOver() {
    this.loggedIn.statusLogged.subscribe((x: any) => this.userLogged = x);
    this.showLogIn = true;
  }
  /*Hidding LogIN absolute div*/
  onMouseLeave() {
    this.loggedIn.statusLogged.subscribe((x: any) => this.userLogged = x);
    this.showLogIn = false;
  }


  /*LOGIN DROPDOWN FOR SMALLER DEVICES CHANGE FUNCTION*/
  changeDropDown(event: boolean): void{
    if (this.iconsWrapper.nativeElement.parentElement.clientWidth <= 820) {
      this.loginDrop.emit(event)
    }
  }
}
