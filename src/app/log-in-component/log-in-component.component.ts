import { PostService } from './../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LogedInService } from '../services/loged-in.service';

@Component({
  selector: 'app-log-in-component',
  templateUrl: './log-in-component.component.html',
  styleUrls: ['./log-in-component.component.css']
})
export class LogInComponentComponent implements OnInit {
  url!: string;
  InvalidLogin!: boolean;
  constructor(private route: ActivatedRoute, private loginService: PostService, private logged: LogedInService, private router: Router) { }

  ngOnInit(): void {
    this.route.url.subscribe((x: any) => {
      this.url = x[0].path;
    })
  }
  changed(username:any): void{
  }

  submit(loginForm: any): void{
    console.log(loginForm.value)
    this.loginService.logIn("https://online-shop-node1.herokuapp.com/login",loginForm.value)
      .subscribe((x: any) => {
        if (x.result == false) this.InvalidLogin = true;
        if (x.result == true) {
          this.InvalidLogin = false;
          this.logged.setStatus(true)
          this.logged.setUser(x.user)
          this.logged.setID(x.id)
          this.router.navigate(['/'])
          this.logged.statusId.subscribe((x: any) => {

          })
        }

    })
  }
}
