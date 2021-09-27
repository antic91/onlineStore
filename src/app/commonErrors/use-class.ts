import { ErrorHandler } from "@angular/core";

export class UseClass implements ErrorHandler{
  handleError(error:any) {
    alert("An unexpected error has happer")
    console.log(error)
  }
}
