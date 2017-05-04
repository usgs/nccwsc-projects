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

  searchQuery:string = null
  selectedTopic: number = null
  selectedSubtopic: number = null
  selectedOrg: number = null
  selectedOrgs = []
  selectedSubtopics = []
  topics = []
  subtopics = []
  orgs = []
  multipleOrgs = true
  resultOrgs
  resultFY
  resultTypes
  resultStatus
  filteredOrg:any = '0'
  filteredFY:any = '0'
  filteredType:any = '0'
  filteredStatus:any = '0'

  constructor(private searchService: SearchService) { }


  resetQuery() {
    this.selectedSubtopics = []
    this.selectedTopic = null
    this.selectedOrgs = []
    this.searchQuery = null
    this.searchService.wipeQuery()
  }

  onQueryChange(query) {
  }

  onTopicsChange(event) {
    console.log(this.selectedTopic)
    var topic = this.topics[event]
    this.subtopics = topic['subtopics']
  };

  onSubtopicsChange(event) {
  }

  onOrgsChange(event) {
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
    var subtopics = '&subtopics=';
    if (this.selectedSubtopics.length > 0) {
       for (var st in this.selectedSubtopics) {
         subtopics = subtopics + encodeURIComponent(this.subtopics[this.selectedSubtopics[st]]['label'])  + ',';
       }
       subtopics = subtopics.substring(0, subtopics.length -1)
    }
    var topic = '&topics=';
    if (this.selectedTopic > -1) {
      topic = topic + encodeURIComponent(this.topics[this.selectedTopic]['label']);
    }
    var organizations = '&organizations=';
    if (this.selectedOrgs.length > 0) {
      for (var org of this.selectedOrgs) {
        organizations = organizations + encodeURIComponent(this.orgs[org]['label']) + ',';
      }
      organizations = organizations.substring(0, organizations.length - 1)
    }
    if (this.searchQuery && this.searchQuery.length > 0) {
      query = query + encodeURIComponent(this.searchQuery);
    }
    queryString = query + topic + subtopics + organizations;  
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
