import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { signUpValidators } from 'src/app/validators/sign-up';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sing-up-form',
  templateUrl: './sing-up-form.component.html',
  styleUrls: ['./sing-up-form.component.css']
})
export class SingUpFormComponent implements OnInit {
  userNameOccupated!: boolean;
  emailOccupated!: boolean;
  form: FormGroup;
  constructor(private sendForm: PostService, private router: Router) {
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




  sendData(): void{
    console.log(this.form.value)
    if (this.userNameOccupated && this.emailOccupated) {
      this.sendForm.signUp("https://online-shop-node1.herokuapp.com/signUp", this.form.value)
        .subscribe((x: any) => {
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
      })
    }
  }

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
