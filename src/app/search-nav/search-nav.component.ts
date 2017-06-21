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
  showReset = false
  totalResults: number;
  totalResultsSubscription: Subscription; 
  multipleOrgs = true
  resultOrgs
  resultFY
  resultTypes
  resultStatus
  filteredOrg:any = '0'
  filteredFY:any = null
  filteredType:any = null
  filteredStatus:any = null

  constructor(private searchService: SearchService) { }


  resetQuery() {
    this.selectedSubtopics = []
    this.selectedTopic = null
    this.selectedOrgs = []
    this.searchQuery = null
    this.searchService.wipeQuery()
  }

  onQueryChange(query) {
    this.showReset = true
  }

  onTopicsChange(event) {
    var topic = this.topics[event]
    this.subtopics = topic['subtopics']
    this.showReset = true
  };

  onSubtopicsChange(event) {
    this.showReset = true
  }


  onOrgsChange(event) {
    this.showReset = true
  }

  onOrgSourceChange(orgSource) {
    this.searchService.updateOrgItems(this.filteredOrg)
  }

  onTypeSourceChange(typeSource) {
    this.searchService.updateTypeItems(this.filteredType)
  }

  onStatusSourceChange(statusSource) {
    this.searchService.updateStatusItems(this.filteredStatus)
  }

  onFYSourceChange(fySource) {
    this.searchService.updateFYItems(this.filteredFY)
  }

  updateFilters(){
    console.log('update filters - snc')
    this.filteredOrg = []    
    this.filteredFY = []
    this.filteredType = []
    this.filteredStatus = []
  }

  resetFilters() {
    console.log('Reset Filters - snc')
    this.showReset = false
    this.updateFilters();
    this.searchService.resetFilters();
  }


  onSubmit(value) {
    var queryString = '';
    var query = '?query=';
    var subtopics = '&subtopics=';
    this.showReset = true
    if (this.selectedSubtopics.length > 0) {
       for (var st in this.selectedSubtopics) {
         subtopics = subtopics + encodeURIComponent(this.subtopics[this.selectedSubtopics[st]]['label'])  + ',';
       }
       subtopics = subtopics.substring(0, subtopics.length -1)
    }
    var topic = '&topics=';
    if ((this.selectedTopic != null) && (this.selectedTopic > -1)) {
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

    this.totalResultsSubscription = this.searchService.totalItem$.subscribe(totalItems=>
    {
      this.totalResults = totalItems;
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
    this.updateFilters();
    this.searchService.resetFilters();

  }

}
