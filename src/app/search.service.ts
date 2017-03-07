import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';

@Injectable()
export class SearchService {
  private results:any = [];
  private _resultsSource = new BehaviorSubject < any > ([]);
  results$ = this._resultsSource.asObservable();
  
  constructor(private http: Http) { }

  getTags() {
    var tagsUrl = 'http://localhost:8000/tags';
    return this.http.get(tagsUrl).map((res:Response) => res.json());  
  }

  getOrganizations() {
    var organizationsUrl = 'http://localhost:8000/organizations';
    return this.http.get(organizationsUrl).map((res:Response) => res.json());  
  }

  getAuthors() {
    var authorsUrl = 'http://localhost:8000/contacts';
    return this.http.get(authorsUrl).map((res:Response) => res.json());  
  }

  updateResults(item) {
    console.log('Updating results');
    this._resultsSource.next(item);
  }

  searchProjects(queryString) {
    var searchUrl = 'http://localhost:8000/search' + queryString;
    return this.http.get(searchUrl).map((res:Response) => {
      this.results = res.json();
      for (var item of res.json()) {
        this.updateResults(item);
      }
      this._resultsSource.next(this.results);
      return this.results;
    });   
  }
}
