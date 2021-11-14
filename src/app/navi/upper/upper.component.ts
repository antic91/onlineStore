import { LogedInService } from './../../services/loged-in.service';
import { PostService } from './../../services/post.service';
import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ResultServiceService } from 'src/app/services/result-service.service';
import { Subscription } from 'rxjs';

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
  @Input('LogInClicked') LogInClicked: boolean = false;

  /*Show Drop Down boolean*/
  showDrop: boolean = false;

  object: any[] = [];
  value!: string;
  showLogIn: boolean = false;
  userLogged!: boolean;


    /*subscription to observable,so we can onDestroy unsubscribe*/
  private subscription!: Subscription;
  private subscription1!: Subscription;

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

  /*Catching enter event on search input */
  pressed($event: any) {

    if (this.inputEl.nativeElement.value.length == 0) {
      this.showDrop = false;
      return
    }
    /* if there is nothing in value return*/
    if ($event.target.value == "" || $event.target.value.trim() == "") {
      this.object = [];
      this.showDrop = false;
      return;
    }
    /*If enter calling navigate function*/
    else if ($event.key == "Enter") {
        this.showDrop = false;
        this.navigate();
        return;

    } else {
      this.showDrop = true;
      this.getSearchData($event.key);
    }

  }


/*Function for get data for search on everynew letter*/
  getSearchData(eventValue: string): void{
      /* call server to get the data*/
      this.service.searchItems("https://online-shop-node1.herokuapp.com/search", { letter: this.inputEl.nativeElement.value })
        .pipe(
          map((res:any)=>res.result)
        )
        .subscribe((x: any[]) => {
          if (x.length > 0) {
            this.result.setNoItems(false);
            this.object = x;
            this.value = this.inputEl.nativeElement.value;
          } else {
            this.result.setNoItems(true);
          }
        })
  }



/*cathing clicked event on dropDown menu and changing input value*/
  setNewValue(event: string) {
    this.inputEl.nativeElement.value = event;
    this.object = []
  }

/*on enter or click navigate */
  navigate(): void{
      this.result.setSearchInputVal("");
      this.result.setSearchInputVal(this.inputEl.nativeElement.value);
      this.result.changeValueAll(this.object);
      this.object = [];
      this.inputEl.nativeElement.value = "";
      this.inputEl.nativeElement.blur();
      this.result.changeStringValue("result");
      this.router.navigate(['/result']);
      this.showDrop = false;
  }



  /*SHOWING LogIN absolute div*/
  onMouseOver() {
    this.subscription = this.loggedIn.statusLogged.subscribe((x: any) => this.userLogged = x);
    this.showLogIn = true;
  }
  /*Hidding LogIN absolute div*/
  onMouseLeave() {
    this.subscription1 = this.loggedIn.statusLogged.subscribe((x: any) => this.userLogged = x);
    this.showLogIn = false;
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription1.unsubscribe();
  }
  /*LOGIN DROP DOWN FOR SMALLER DEVICES CHANGE FUNCTION*/
  changeDropDown(event: boolean): void{
    if (this.iconsWrapper.nativeElement.parentElement.clientWidth <= 820) {
      this.loginDrop.emit(event)
    }
  }

}
