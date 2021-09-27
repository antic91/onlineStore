import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PostService extends DataService{

  constructor(http: HttpClient, private router:ActivatedRoute) {
    super(http);
  }
}
