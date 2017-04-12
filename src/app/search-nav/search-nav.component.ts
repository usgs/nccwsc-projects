import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'search-nav',
  templateUrl: './search-nav.component.html',
  styleUrls: ['./search-nav.component.scss']
})
export class SearchNavComponent implements OnInit {
  resultOrgsSubscription: Subscription;
  resultFYSubscription: Subscription;
  resultStatusSubscription: Subscription;
  resultTypesSubscription: Subscription;

  searchQuery:string = null;
  selectedTopic: number = null;
  selectedSubtopic: number = null;
  selectedOrg: number = null;
  topics = [];
  subtopics = [];  
  orgs = [];
  resultOrgs;
  resultFY;
  resultTypes;
  resultStatus;
  filteredOrg:any = '0';
  filteredFY:any = '0';
  filteredType:any = '0';
  filteredStatus:any = '0';

  constructor(private searchService: SearchService) { }


  resetQuery() {
    this.selectedTopic = 0;
    this.selectedSubtopic = 0;
    this.searchQuery = '';
    this.selectedOrg = 0;
  }

  onQueryChange(query) {
  }

  onTopicsChange(event) {
    this.selectedTopic = event;
    var topic = this.topics[event]
    this.subtopics = topic['subtopics']
  };

  onSubtopicsChange(event) {
    this.selectedSubtopic = event;
  }

  onOrgsChange(event) {
    this.selectedOrg = event;
  }

  onOrgSourceChange(orgSource) {
    this.searchService.updateOrgItems(orgSource);

  }

  onTypeSourceChange(typeSource) {
    this.searchService.updateTypeItems(typeSource);
  }

  onStatusSourceChange(statusSource) {
    this.searchService.updateStatusItems(statusSource);
  }

  onFYSourceChange(fySource) {
    this.searchService.updateFYItems(fySource);
  }

  updateFilters(){
    console.log(this.filteredOrg);
    this.filteredOrg = '0';
    this.filteredFY = '0';
    this.filteredType = '0';
    this.filteredStatus = '0';
  }

  resetFilters() {
    this.updateFilters();
    this.searchService.resetFilters();
  }

  onSubmit(value) {
    var queryString = '';
    var query = '?query=';
    var subtopic = '&subtopics=';
    if (this.selectedSubtopic !== null) {
       subtopic = subtopic + encodeURIComponent(this.subtopics[this.selectedSubtopic]['label']);
    }
    var topic = '&topics=';
    
    if ((this.selectedTopic) && (this.selectedTopic !== null)) {
      topic = topic + encodeURIComponent(this.topics[this.selectedTopic]['label']);
    }
    var organizations = '&organizations=';
    if (this.selectedOrg !== null) {
      organizations = organizations + encodeURIComponent(this.orgs[this.selectedOrg]['label']);
    }
    if (this.searchQuery && this.searchQuery.length > 0) {
      query = query + encodeURIComponent(this.searchQuery);
    }
    queryString = query + topic + subtopic + organizations;  
    this.searchService.searchProjects(queryString).subscribe(results => {
      this.updateFilters();
    });    
    
  }

  ngOnInit() {
    this.searchService.getTopics().subscribe(topics => {
      this.topics = topics;
    });

    this.searchService.getOrganizations().subscribe(organizations => {
      this.orgs = organizations;
    });

    this.resultOrgsSubscription = this.searchService.resultOrg$.subscribe(resultOrgs=>
    {
      this.resultOrgs = resultOrgs;
    });

    this.resultFYSubscription = this.searchService.resultFY$.subscribe(resultFY=>
    {
      this.resultFY = resultFY;
    });

    this.resultTypesSubscription = this.searchService.resultType$.subscribe(resultTypes=>
    {
      this.resultTypes = resultTypes;
    });
    this.resultStatusSubscription = this.searchService.resultStatus$.subscribe(resultStatus=>
    {
      this.resultStatus = resultStatus;
    });

  }

}
