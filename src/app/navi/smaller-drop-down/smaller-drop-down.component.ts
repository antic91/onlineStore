import { Component, Input, OnInit, Output, EventEmitter, HostListener, ElementRef, ViewChild } from '@angular/core';
import { LogedInService } from 'src/app/services/loged-in.service';

@Component({
  selector: 'app-smaller-drop-down',
  templateUrl: './smaller-drop-down.component.html',
  styleUrls: ['./smaller-drop-down.component.css']
})
export class SmallerDropDownComponent implements OnInit {

    /*watch width of element*/
  @ViewChild('smaller', { read: ElementRef }) smaller!: ElementRef;


  @Input('showLogin') showLogin: boolean = false;
  @Input('showMenu') showMenu: boolean = false;
  /*change Menu status */
  @Output("statusMenu") statusMenu = new EventEmitter<boolean>();


  logedInStatus: boolean = false;

  nameOfUser!: string;

  constructor(private loggedIn: LogedInService) { }

  ngOnInit(): void {
    /*Checking logged user*/
    this.loggedIn.statusLogged.subscribe((res) => {
      this.logedInStatus = res;
      if (res) {
        this.loggedIn.statusUser.subscribe((x: any) => {
          this.nameOfUser = x;
        })
      }
    })
  }

  /*Log out function*/
  logOUT(): void{
    this.loggedIn.setStatus(false);
    this.loggedIn.setUser("");
    this.statusMenu.emit(false)
  }

  /*Close login menu function*/
  closeLoginMenu(): void{
    this.statusMenu.emit(false)
  }
  /*Close menu function*/
  closeMenu(): void{
    this.showMenu = false;
    this.statusMenu.emit(false)
  }

  /*On resize close drop down menu*/
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth >= 1026) {
      this.statusMenu.emit(false)
      this.showMenu = false;
      this.showLogin = false;
    }

  }
}
