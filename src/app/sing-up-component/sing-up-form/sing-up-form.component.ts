import { AppError } from './../../commonErrors/app-error';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { signUpValidators } from 'src/app/validators/sign-up';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorError } from 'src/app/commonErrors/error-error';
@Component({
  selector: 'app-sing-up-form',
  templateUrl: './sing-up-form.component.html',
  styleUrls: ['./sing-up-form.component.css']
})
export class SingUpFormComponent implements OnInit {
  /*booleans for errors username and email occupated*/
  userNameOccupated!: boolean;
  emailOccupated!: boolean;

  form: FormGroup;

  constructor(private sendForm: PostService, private router: Router) {
    /*set this.form, all validators....*/
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3), signUpValidators.cannotContainSpace]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3), signUpValidators.cannotContainSpace]),
      username: new FormControl('', [Validators.required, Validators.minLength(3), signUpValidators.cannotContainSpace]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), signUpValidators.cannotContainSpace]),
      repeatedPassword: new FormControl('', [Validators.required, Validators.minLength(6), signUpValidators.cannotContainSpace]),
      email: new FormControl('', [Validators.required, Validators.email, signUpValidators.cannotContainSpace]),
      address: new FormGroup({
        town: new FormControl(''),
        street: new FormControl(''),
        streetNum: new FormControl(''),
        zipCode: new FormControl(''),
        country: new FormControl('')
      }),
      mobileNumber: new FormControl('', [Validators.required, signUpValidators.cannotContainSpace])
    })

  }

  ngOnInit(): void {
    this.userNameOccupated = true;
    this.emailOccupated = true;
  }

  /*getter methods to write less html code*/
  get firstName() {
    return this.form.get("firstName")
  }
  get lastName() {
    return this.form.get("lastName")
  }
  get username() {
    return this.form.get("username")
  }
  get password() {
    return this.form.get("password")
  }
  get repeatedPassword() {
    return this.form.get("repeatedPassword")
  }
  get email() {
    return this.form.get("email")
  }
  get mobileNumber() {
    return this.form.get("mobileNumber")
  }
  get address() {
    return this.form.get("address")
  }



  /*Function on Submit send data to server*/
  sendData(): void{
    /*If username and email are free then register new user*/
    if (this.userNameOccupated && this.emailOccupated) {
      this.sendForm.signUp("https://online-shop-node1.herokuapp.com/signUp", this.form.value)
        .subscribe((x: any) => {

          /*reset form and navigate to home*/

          this.form = new FormGroup({
            firstName: new FormControl('', [Validators.required, Validators.minLength(3), signUpValidators.cannotContainSpace]),
            lastName: new FormControl('', [Validators.required, Validators.minLength(3), signUpValidators.cannotContainSpace]),
            username: new FormControl('', [Validators.required, Validators.minLength(3), signUpValidators.cannotContainSpace]),
            password: new FormControl('', [Validators.required, Validators.minLength(6), signUpValidators.cannotContainSpace]),
            repeatedPassword: new FormControl('', [Validators.required, Validators.minLength(6), signUpValidators.cannotContainSpace]),
            email: new FormControl('', [Validators.required, Validators.email, signUpValidators.cannotContainSpace]),
            address: new FormGroup({
              town: new FormControl(''),
              street: new FormControl(''),
              streetNum: new FormControl(''),
              zipCode: new FormControl(''),
              country: new FormControl('')
            }),
            mobileNumber: new FormControl('', [Validators.required, signUpValidators.cannotContainSpace])
          })


          this.form.markAsUntouched();
          this.form.setErrors(null);
          this.router.navigate(['/'])

        }, (error: AppError) => {
          if (error instanceof ErrorError) {
            console.log("ErrorError")
          } else throw error
      })
    }
  }

  /*On every input change call server to check if the username is already taken*/
  checkUsername(): void{
    if (this.username?.value.length > 0) {
      this.sendForm.checkUsername("https://online-shop-node1.herokuapp.com/checkUsername", { value: this.username?.value })
        .pipe(
          map((x:any)=>x.result)
        )
      .subscribe((x: any) => {
        this.userNameOccupated = x;
      })
    }
  }

  /*On every input change call server to check if the email is already taken*/
  checkEmail(): void{
    if (this.email?.value.length > 0) {
      this.sendForm.checkEmail("https://online-shop-node1.herokuapp.com/checkEmail", { value: this.email?.value })
        .pipe(
          map((x:any)=>x.result)
        )
      .subscribe((x: any) => {
        this.emailOccupated = x;
      })
    }
  }

}
