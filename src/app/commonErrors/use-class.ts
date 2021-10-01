import { ErrorHandler } from "@angular/core";

export class AppErrorHandler implements ErrorHandler{
  handleError(error:any) {
    alert("An unexpected error has happen")
    console.log(error)
  }
}
