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
  private selectedTopic;
  private selectedSubtopic;
  private selectedOrg;
  private topics = [];
  private subtopics = [];  
  private orgs = [];

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

  constructor(private searchService: SearchService) { }

  onQueryChange(query) {

  }

  onTopicsChange(event) {
    console.log(event);
    console.log(this.topics)
    this.selectedTopic = event;
    var topic = this.topics[event]
    this.subtopics = topic['subtopics']
  };

  onSubtopicsChange(event) {
    this.selectedSubtopic = event;
    console.log(event);
  }

  onOrgsChange(event) {
    this.selectedOrg = event;
    console.log("New Organization.")
    console.log(event);
  }

  onSubmit(value) {
    var queryString = '';
    var query = '?query=';
    var subtopic = '&subtopics=';
    if (this.selectedSubtopic) {
       subtopic = subtopic + encodeURIComponent(this.subtopics[this.selectedSubtopic]['label']);
    }
    var topic = '&topics=';
    if (this.selectedTopic) {
      topic = topic + encodeURIComponent(this.topics[this.selectedTopic]['label']);
    }
    var organizations = '&organizations=';
    if (this.selectedOrg) {
      console.log("Here.")
      organizations = organizations + encodeURIComponent(this.orgs[this.selectedOrg]['label']);
    } else {
      console.log("No selected org?  wtf?")
      console.log(this.selectedOrg);
    }
    if (this.searchQuery.length > 0) {
      query = query + encodeURIComponent(this.searchQuery);
    }
    console.log(query);
    console.log(topic);
    console.log(subtopic);
    console.log(organizations)

/*    
    if (this.selectedTopics.length > 0) {
      for (var key in this.selectedTags) {
        for (var tag in this.tags) {
          if (this.tags[tag].id == this.selectedTags[key]) {
            topic = tags + encodeURIComponent(this.tags[tag].name) + ','
          }
        }
      }
      tags = tags.substring(0, tags.length-1);
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
*/
    queryString = query + topic + subtopic + organizations;  
    this.searchService.searchProjects(queryString).subscribe(results => {
    });    
  }

  ngOnInit() {
    this.searchService.getTopics().subscribe(topics => {
      this.topics = topics;
      console.log(this.topics);
    });

    this.searchService.getOrganizations().subscribe(organizations => {
      this.orgs = organizations;
      console.log(this.orgs);
    });

    /*
    this.searchService.getTags().subscribe(tags => {
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
