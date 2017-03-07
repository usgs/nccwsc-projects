import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from 'angular-2-dropdown-multiselect/src/multiselect-dropdown';

@Component({
  selector: 'search-nav',
  templateUrl: './search-nav.component.html',
  styleUrls: ['./search-nav.component.scss']
})
export class SearchNavComponent implements OnInit {
  private searchQuery = null;
  private selectedTags:number[] = [];
  private selectedAuthors:number[] = [];
  private selectedOrgs:number[] = [];
  private tags:IMultiSelectOption[] = [];
  private orgs:IMultiSelectOption[] = [
    {id: 0, name: 'NCCWSC'},
    {id: 1, name: 'Alaska CSC'},
    {id: 2, name: 'North Central CSC'},
    {id: 3, name: 'Northeast CSC'},
    {id: 4, name: 'Northwest CSC'},
    {id: 5, name: 'Pacific Islands CSC'},
    {id: 6, name: 'South Central CSC'},
    {id: 7, name: 'Southeast CSC'},
    {id: 8, name: 'Southwest CSC'}
  ];
  private authors:IMultiSelectOption[] = [];

private mySettings: IMultiSelectSettings = {
    pullRight: false,
    enableSearch: true,
    checkedStyle: 'checkboxes',
    buttonClasses: 'btn btn-primary btn-block',
    selectionLimit: 0,
    closeOnSelect: false,
    showCheckAll: false,
    showUncheckAll: false,
    dynamicTitleMaxItems: 3,
    maxHeight: '300px',
};

private tagTexts: IMultiSelectTexts = {
    searchPlaceholder: 'Search...',
    defaultTitle: 'Topic(s)'
};

private authorTexts: IMultiSelectTexts = {
    searchPlaceholder: 'Search...',
    defaultTitle: 'People'
};

private orgTexts: IMultiSelectTexts = {
    searchPlaceholder: 'Search...',
    defaultTitle: 'NCCWSC/CSC(s)'
};


  constructor(private searchService: SearchService) { }

  onQueryChange(query) {

  }

  onTagsChange(event) {
    console.log(event);
  };

  onAuthorsChange(event) {
    console.log(event);
  }

  onOrgsChange(event) {
    console.log(event);
  }

  onSubmit(value) {
    var queryString = '';
    var query = '?query=';
    var tags = '&tags=';
    var orgs = '&orgs=';
    var authors = '&authors=';
    
    if (this.searchQuery.length > 0) {
      query = query + encodeURIComponent(this.searchQuery);
    }
    
    if (this.selectedTags.length > 0) {
      for (var key in this.selectedTags) {
        for (var tag in this.tags) {
          if (this.tags[tag].id == this.selectedTags[key]) {
            tags = tags + encodeURIComponent(this.tags[tag].name) + ','
          }
        }
      }
      tags = tags.substring(0, tags.length-1);
    }
    
    if (this.selectedOrgs.length > 0) {
      for (var key in this.selectedOrgs) {
        for (var org in this.orgs) {
          if (this.orgs[org].id == this.selectedOrgs[key]) {
            orgs = orgs + encodeURIComponent(this.orgs[org].name) + ','
          }
        }
      }
      orgs = orgs.substring(0, orgs.length-1);
    }

    if (this.selectedAuthors.length > 0) {
      for (var key in this.selectedAuthors) {
        for (var author in this.authors) {
          if (this.authors[author].id == this.selectedAuthors[key]) {
            console.log(this.authors[author].name)
            authors = authors + encodeURIComponent(this.authors[author].name) + ','
          }
        }
      }
      authors = authors.substring(0, authors.length-1);
    }
    queryString = query + tags + authors + orgs;  
    console.log(queryString);
    this.searchService.searchProjects(queryString).subscribe(results => {
      console.log(results);
    });    
  }

  ngOnInit() {
    /*this.searchService.getTags().subscribe(tags => {
      var tag_id = 0;
      for (var tag in tags['tags']) {
        this.tags.push({id : tag_id, name: tags['tags'][tag]});
        tag_id = tag_id + 1;
      }
    });
    this.searchService.getAuthors().subscribe(authors => {
      var author_id = 0;
      for (var author in authors['contacts']) {
        this.authors.push({id : author_id, name: authors['contacts'][author]});
        author_id = author_id + 1;
      }
   }); */
  }

}
