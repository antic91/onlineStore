import { Component, Input, OnInit } from '@angular/core';
import { LogedInService } from 'src/app/services/loged-in.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  @Input("userLogged") userLogged!: boolean;
  nameOfUser!: string;
  constructor(private logged:LogedInService) { }

  ngOnInit(): void {
    if (this.userLogged) {
      this.logged.statusUser.subscribe((x: any) => {
        this.nameOfUser = x;
      })
    }
  }
  logOUT(): void{
    this.logged.setStatus(false);
    this.logged.setUser("")
  }
}
