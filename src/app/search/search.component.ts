import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  private query = '';
  private results = [];
  resultsSubscription: Subscription;
  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.resultsSubscription = this.searchService.results$.subscribe(results=>this.results = results);
  }

  ngOnDestroy() {
    this.resultsSubscription.unsubscribe();
  }

}
