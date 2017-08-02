import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import { environment } from '../environments/environment';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class NccwscDrupalService {

  constructor(private http: Http) { }

  loadMenu() {
    // Load menu from ncccwsc drupal site here...
    var nccwscMenuUrl = environment.baseURL + '/menu-export';
    return this.http.get(nccwscMenuUrl).map((res:Response) => res.json());  
  }

}
