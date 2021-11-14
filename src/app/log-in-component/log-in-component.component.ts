import { AppError } from './../commonErrors/app-error';
import { PostService } from './../services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { LogedInService } from '../services/loged-in.service';
import { NotFoundError } from '../commonErrors/not-found-error';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeIn } from '../animations/animations';

@Component({
  selector: 'app-log-in-component',
  templateUrl: './log-in-component.component.html',
  styleUrls: ['./log-in-component.component.css'],
  animations: [
    trigger('fadeIn',[
      transition(':enter', [
        useAnimation(fadeIn, {
          params: {
            opacity1: 0,
            opacity2: 1,
            time:'500ms ease-in'
          }
        })
      ]),
      transition(':leave', [
        useAnimation(fadeIn, {
          params: {
            opacity1: 0,
            opacity2: 1,
            time:'500ms ease-in'
          }
        })
      ])
    ])
  ]
})
export class LogInComponentComponent implements OnInit {
  /*On init start animation*/
  fadeIn: boolean = false;

  url!: string;
  InvalidLogin!: boolean;

  constructor(private route: ActivatedRoute, private callServer: PostService, private logged: LogedInService, private router: Router) { }

  /*If we are on Sign up page, use this boolean to hide follow and route component of log in page*/
  @Input('displayHide') displayHide: boolean = true;

  ngOnInit(): void {
    /*Start animation */
    this.fadeIn = true;

    /*Getting path from route*/
    this.route.url.subscribe((x: any) => {
      this.url = x[0].path;
    })
  }

  /*on change in inputs we can do something...*/
  changed(event: any): void{
    console.log(event)
  }

  /*On submit form call the server and send form value*/
  submit(loginForm: any): void{

    this.callServer.logIn("https://online-shop-node1.herokuapp.com/login",loginForm.value)
      .subscribe((x: any) => {

        if (x.result == false) this.InvalidLogin = true;
        /*If success then set in LogedInService status that the user is logged,
        set username and user Id, after that navigate to home */
        if (x.result == true) {
          this.InvalidLogin = false;
          this.logged.setStatus(true)
          this.logged.setUser(x.user)
          this.logged.setID(x.id)
          this.router.navigate(['/'])
          ,(error: AppError) => {
            if (error instanceof NotFoundError) {
              console.log("not found error")
            }else throw error
          }
        }

    })
  }

}
