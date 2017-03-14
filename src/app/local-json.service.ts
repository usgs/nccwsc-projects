import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class LocalJsonService {

  constructor(private http: Http) { }

  loadCscProjects(csc_id) {
    var cscUrl = 'http://localhost:8000/projects/' + csc_id;
    return this.http.get(cscUrl).map((res:Response) => res.json());  
  }

  loadTopics() {
    var cscUrl = 'https://my-beta.usgs.gov/nccwsc-service/topics/';
    return this.http.get(cscUrl).map((res:Response) => res.json());  
  }

  loadTopic(topic_id) {
    var cscUrl = 'https://my-beta.usgs.gov/nccwsc-service/themes/' + topic_id;
    return this.http.get(cscUrl).map((res:Response) => res.json());  
  }

  loadProject(csc_id, project_id) {
    var cscUrl = 'https://my-beta.usgs.gov/nccwsc-service/projects/' + csc_id + '/' + project_id;
    return this.http.get(cscUrl).map((res:Response) => res.json());  
  }

  private handleError(error: any): Promise < any > {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}