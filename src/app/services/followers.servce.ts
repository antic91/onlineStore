import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FollowersService extends DataService{


  constructor(http: HttpClient) {
    super(http)
  }
}
