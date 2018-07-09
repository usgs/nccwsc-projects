import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from 'environments/environment';

@Injectable()
export class SciencebaseService {

  constructor(public http: Http) { }

  getSciencebaseRecord(sbId) {
    console.log('Getting SB record: ' + sbId)
    var sbURL = environment.sbmainURL + '/catalog/item/' + sbId  + '?format=json'
    return this.http.get(sbURL)
      .map(response=>{
        return response.json()
      })
      .catch(this.handleError)
  }

  private handleError(error: any): Promise < any > {
    console.log('ERROR!')
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
