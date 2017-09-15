import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { environment } from '../environments/environment';
import 'rxjs/Rx';

@Injectable()
export class LocalJsonService {

  serviceURL = environment.serviceURL

  constructor(private http: Http) { }

  loadCscProjects(csc_id) {
    var cscUrl = this.serviceURL + '/projects/' + csc_id;
    console.log(cscUrl)
    return this.http.get(cscUrl).map((res:Response) => res.json());  
  }

  loadTopics() {
    var cscUrl = this.serviceURL + '/topics/';
    console.log(cscUrl)
    return this.http.get(cscUrl).map((res:Response) => res.json());  
  }

  loadTopic(topic_name) {
    var cscUrl = this.serviceURL + '/search?query=&topics=' + topic_name + '&subtopics=&organizations=';
    console.log(cscUrl)
    console.log(cscUrl);
    return this.http.get(cscUrl).map((res:Response) => res.json());  
  }

  loadProject(csc_id, project_id) {
    var cscUrl = this.serviceURL + '/projects/' + csc_id + '/' + project_id;
    console.log(cscUrl)
    return this.http.get(cscUrl).map((res:Response) => res.json());  
  }

  private handleError(error: any): Promise < any > {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}