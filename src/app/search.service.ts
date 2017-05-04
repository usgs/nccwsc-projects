import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';

@Injectable()
export class SearchService {
  fiscal_years:any = [];
  statuses:any = [];
  results:any = [];
  filteredResults:any = [];
  resultOrgs:any = [{'value': 0, 'label': 'All Organizations' }];
  resultFY:any = [{'value': 0, 'label': 'All Fiscal Years'}];
  resultTypes:any = [{'value': 0, 'label': 'All Types'}];
  resultStatus:any = [{'value': 0, 'label': 'All Statuses'}];
  orgFilter = 'All Organizations';
  statusFilter = 'All Statuses';
  fyFilter = 'All Fiscal Years';
  typeFilter = 'All Types';
  _resultOrgs = new BehaviorSubject < any > ([]);
  resultOrg$ = this._resultOrgs.asObservable();
  _resultFY = new BehaviorSubject < any > ([]);
  resultFY$ = this._resultFY.asObservable();
  _resultTypes = new BehaviorSubject < any > ([]);
  resultType$ = this._resultTypes.asObservable();
  _resultStatus = new BehaviorSubject < any > ([]);
  resultStatus$ = this._resultStatus.asObservable();
  _filteredResultsSource = new BehaviorSubject < any > ([]);
  filteredResults$ = this._filteredResultsSource.asObservable();
  _totalResultsSource = new BehaviorSubject < number > (0);
  totalItem$ = this._totalResultsSource.asObservable();
  

  constructor(private http: Http) { }

  getTopics() {
    var topicsUrl = 'https://my-beta.usgs.gov/nccwsc-service/topics';
    return this.http.get(topicsUrl).map((res:Response) => res.json());  
  }

  getOrganizations() {
    var organizationsUrl = 'https://my-beta.usgs.gov/nccwsc-service/organizations';
    return this.http.get(organizationsUrl).map((res:Response) => res.json());  
  }

  updateResults(item) {
    this.filteredResults.push(item);
  }

  sortProjectsByKey(array, key) {
    console.log(array);
    return array.sort(function(a, b) {
        var x = a[key].trim().replace(/['"]/g, '').toLowerCase(); var y = b[key].trim().replace(/['"]/g, '').toLowerCase();
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }
  
  updateTotalResults(number) {
    this._totalResultsSource.next(number);
  }

  updateOrgItems(orgSource){
    this.orgFilter = orgSource;
    this.filterItems();
  }
  
  updateTypeItems(typeSource) {
    this.typeFilter = typeSource;
    this.filterItems();
  }

  updateStatusItems(statusSource) {
    this.statusFilter = statusSource;
    this.filterItems();
  }

  updateFYItems(fySource) {
    this.fyFilter = fySource;
    this.filterItems();
  }

  resetFilters() {
    this.orgFilter = 'All Organizations';
    this.typeFilter = 'All Types';
    this.statusFilter = 'All Statuses';
    this.fyFilter = 'All Fiscal Years';
    this.filterItems();
  }

  filterItems() {
    this.updateTotalResults(-1);
    this.filteredResults = [];
    var tempOrgs = [];
    var tempTypes = [];
    var tempStatus = [];
    var tempFY = [];
    for (var item of this.results) {
      var hasOrg = false;
      var hasStatus = false;
      var hasFY = false;
      var hasType = false;
      if (this.orgFilter == 'All Organizations') {
        hasOrg = true;
      } else {
        if (item.organizations) {
          for (var org in item.organizations) {
            if (item.organizations[org].trim() == this.orgFilter) {
              hasOrg = true;
              break;
            }
          }
        }
      }
      if ((item.status == this.statusFilter) || (this.statusFilter == 'All Statuses')) {
        hasStatus = true;
      }
      if ((item.fiscal_year == this.fyFilter) || (this.fyFilter == 'All Fiscal Years')) {
        hasFY = true;
      }
      console.log(this.typeFilter);
      if (this.typeFilter == 'All Types') {
        hasType = true;
      } else {
        if (item.types) {
          for (var type in item.types) {
            if (item.types[type] == this.typeFilter) {
    
              hasType = true;
              break;
            } else {
            }
          }
        }
      }
      if ((hasOrg) && (hasStatus) && (hasFY) && (hasType)) {
        this.filteredResults.push(item);
        for (var org in item.organizations) {
          if ((tempOrgs.indexOf(item.organizations[org].trim()) < 0) && item.organizations[org] != null) {
            tempOrgs.push(item.organizations[org].trim());
          }
        }
        for (var type in item.types) {
          if ((tempTypes.indexOf(item.types[type]) < 0) && (item.types[type] != null)){
            tempTypes.push(item.types[type])
          }
        } 
        if ((tempFY.indexOf(item.fiscal_year) < 0) && (item.fiscal_year != null)) {
          tempFY.push(item.fiscal_year)
        }      
        if ((tempStatus.indexOf(item.status) < 0) && (item.status != null)){
          tempStatus.push(item.status)
        }        
      }
    }

      this.resultOrgs = [{'value': 0, 'label': 'All Organizations' }];
      this.resultFY = [{'value': 0, 'label': 'All Fiscal Years'}];
      this.resultTypes = [{'value': 0, 'label': 'All Types'}];
      this.resultStatus = [{'value': 0, 'label': 'All Statuses'}];
      var value = 1;
      tempOrgs.sort();
      for (var org in tempOrgs) {
        this.resultOrgs.push({'value': value, 'label': tempOrgs[org]});
        value = value + 1;
      }
      value = 1;
      tempTypes.sort();
      for (var type in tempTypes) {
        this.resultTypes.push({'value': value, 'label': tempTypes[type]});
        value = value + 1;
      }

      value = 1;
      tempFY.sort();
      for (var fy in tempFY) {
        this.resultFY.push({'value': value, 'label': tempFY[fy]});
        value = value + 1;
      }

      value = 1;
      tempStatus.sort();
      for (var status in tempStatus) {
        this.resultStatus.push({'value': value, 'label': tempStatus[status]});
        value = value + 1;
      }
    this.updateTotalResults(Object.keys(this.filteredResults).length);
    this._filteredResultsSource.next(this.filteredResults);
      this._resultOrgs.next(this.resultOrgs);
      this._resultFY.next(this.resultFY);
      this._resultTypes.next(this.resultTypes);
      this._resultStatus.next(this.resultStatus);

  }

  clearFilters() {
    this.filteredResults = [];
    this.orgFilter = 'All Organizations';
    this.statusFilter = 'All Statuses';
    this.fyFilter = 'All Fiscal Years';
    this.typeFilter = 'All Types';
    this.filterItems();
  }

  wipeQuery() {
    this.results = [];
    this.filteredResults = [];
    this.resultOrgs = [{'value': 0, 'label': 'All Organizations' }];
    this.resultFY = [{'value': 0, 'label': 'All Fiscal Years'}];
    this.resultTypes = [{'value': 0, 'label': 'All Types'}];
    this.resultStatus = [{'value': 0, 'label': 'All Statuses'}];
    this.updateTotalResults(0)
    this._filteredResultsSource.next(this.filteredResults);
    this._resultOrgs.next(this.resultOrgs);
    this._resultFY.next(this.resultFY);
    this._resultTypes.next(this.resultTypes);
    this._resultStatus.next(this.resultStatus);
  }

  searchProjects(queryString) {
    console.log('New Query...')
    console.log(queryString)
    this.updateTotalResults(-1);
    var searchUrl = 'https://my-beta.usgs.gov/nccwsc-service/search' + queryString;
    this.results = [];
    this.filteredResults = [];
    return this.http.get(searchUrl).map((res:Response) => {
      this.results = this.sortProjectsByKey(res.json(), 'title');
      var tempOrgs = [];
      var tempTypes = [];
      var tempStatus = [];
      var tempFY = [];
      this.updateTotalResults(Object.keys(this.results).length);
      for (var item of this.results) {       
        for (var org in item.organizations) {
          if ((tempOrgs.indexOf(item.organizations[org].trim()) < 0) && item.organizations[org] != null) {
            tempOrgs.push(item.organizations[org].trim());
          }
        }
        for (var type in item.types) {
          if ((tempTypes.indexOf(item.types[type]) < 0) && (item.types[type] != null)){
            tempTypes.push(item.types[type])
          }
        } 
        if ((tempFY.indexOf(item.fiscal_year) < 0) && (item.fiscal_year != null)) {
          tempFY.push(item.fiscal_year)
        }      
        if ((tempStatus.indexOf(item.status) < 0) && (item.status != null)){
          tempStatus.push(item.status)
        }      
        this.updateResults(item);
      }
      var value = 1;
      tempOrgs.sort();
      for (var org in tempOrgs) {
        this.resultOrgs.push({'value': value, 'label': tempOrgs[org]});
        value = value + 1;
      }
      value = 1;
      tempTypes.sort();
      for (var type in tempTypes) {
        this.resultTypes.push({'value': value, 'label': tempTypes[type]});
        value = value + 1;
      }

      value = 1;
      tempFY.sort();
      for (var fy in tempFY) {
        this.resultFY.push({'value': value, 'label': tempFY[fy]});
        value = value + 1;
      }

      value = 1;
      tempStatus.sort();
      for (var status in tempStatus) {
        this.resultStatus.push({'value': value, 'label': tempStatus[status]});
        value = value + 1;
      }
      this._filteredResultsSource.next(this.filteredResults);
      this._resultOrgs.next(this.resultOrgs);
      this._resultFY.next(this.resultFY);
      this._resultTypes.next(this.resultTypes);
      this._resultStatus.next(this.resultStatus);
    });   
  }
}
