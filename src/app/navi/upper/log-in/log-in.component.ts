import { trigger, transition, useAnimation } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/animations/animations';
import { LogedInService } from 'src/app/services/loged-in.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  animations: [
     trigger('fadeIn', [
      transition(':enter', [
        useAnimation(fadeIn, {
          params: {
            opacity1: 0,
            opacity2: 1,
            time:"400ms ease-in"
          }
        })
      ]),
      transition(':leave', [
        useAnimation(fadeIn, {
          params: {
            opacity1: 1,
            opacity2: 0,
            time:"400ms ease-in"
          }
        })
      ])
    ])
  ]
})
export class LogInComponent implements OnInit {
  @Input("userLogged") userLogged!: boolean;
  nameOfUser!: string;

  constructor(private logged:LogedInService) { }

  ngOnInit(): void {
    /*Ifuser is logged in get the name to show*/
    if (this.userLogged) {
      this.logged.statusUser.subscribe((x: any) => {
        this.nameOfUser = x;
      })
  }

  }

  /*Log out function*/
  logOUT(): void{
    this.logged.setStatus(false);
    this.logged.setUser("")
  }
}
