import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogedInService {

  constructor() { }

  private loaded = new BehaviorSubject<number| boolean>(false);
  statusLoaded = this.loaded.asObservable();

  private logged = new BehaviorSubject<boolean>(false);
  statusLogged = this.logged.asObservable();

  private user = new BehaviorSubject<string| null>("");
  statusUser = this.user.asObservable();

  private id = new BehaviorSubject<number| null>(null);
  statusId= this.id.asObservable();

  setStatus(event: boolean): void{
    this.logged.next(event)
  }
  setUser(event: string): void{
    this.user.next(event)
  }
  setID(event: number): void{
    this.id.next(event)
  }
  setLoaded(event: boolean): void{
    this.loaded.next(event)
  }
}
