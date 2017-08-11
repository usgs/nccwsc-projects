import { Component, OnInit } from '@angular/core';
import { LocalJsonService } from '../local-json.service';
import { SearchService } from '../search.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {
  sub = null;
  topic = null;
  page_title = null;

  topics = {
    'dought-fire-extremes': '588244b0e4b0b3d9add24391',
    'education-modeling-tools': '588247c7e4b0b3d9add243a5',
    'landscapes': '5882456be4b0b3d9add24395',
    'native-communities': '588246dae4b0b3d9add243a1',
    'water-ice': '5882464ce4b0b3d9add2439a',
    'wildlife-plants': '58824220e4b0b3d9add2438b'
  }
  topic_names = {
    'dought-fire-extremes': 'Drought, Fire and Extreme Weather',
    'education-modeling-tools': 'Education, Modeling and Tools',
    'landscapes': 'Landscapes',
    'native-communities': 'Native Communities',
    'water-ice': 'Water and Ice',
    'wildlife-plants': 'Wildlife and Plants'
  }

  //topics_url = ['https://my-beta.usgs.gov/nccwsc/explore-by-topic'];
  topics_url = environment.baseURL + '/explore-by-topic';

  subtopics = ['All Subtopics'];
  fiscal_years = ['All Fiscal Years'];
  statuses = ['All Statuses'];
  cscs=['All CSCs'];
  types=['All Types'];
  current_subtopic = 'All Subtopics';
  current_type = 'All Types';
  current_fy = 'All Fiscal Years';
  current_status = 'All Statuses';
  current_csc = 'All CSCs';
  topicKeys;
  projectsList = [];
  filteredProjectsList = [];
  dataLoading = true;
  subtopicsFilter:string[] = null;

  constructor(private route: ActivatedRoute, private localJson: LocalJsonService, private searchService: SearchService, private router: Router) { }

  filterProjectsList(event:any = null) {
    this.filteredProjectsList = [];
    for (var project in this.projectsList) {
      if (this.current_subtopic != 'All Subtopics') {
        for (var subtopic in this.projectsList[project].subtopics) {
          var matched_subtopic = true;
          if (this.projectsList[project].subtopics[subtopic] !== this.current_subtopic) {
             matched_subtopic = false
          } else {
            break
          }
        }
        if (!matched_subtopic) {
          continue;
        }
      }
      var matchedType = false;
      if (this.current_type != 'All Types') {
        for (var thisType in this.projectsList[project].types) {
          var matchedType = true
          if (this.projectsList[project].types[thisType] !== this.current_type) {
            matchedType = false
          } else {
            break
          }
        }
        if (!matchedType) {
          continue;
        }
      }
      if (this.current_fy != 'All Fiscal Years') {
        if (this.projectsList[project].fiscal_year !== this.current_fy) {
          continue;
        }
      }
      if (this.current_status != 'All Statuses') {
        if (this.projectsList[project].status !== this.current_status) {
          continue;
        }
      }
      if (this.current_csc != 'All CSCs') {
        if (this.projectsList[project].csc['name'] !== this.current_csc) {
          continue;
        }
      }
      this.filteredProjectsList.push(this.projectsList[project]);

    }
  }

  showAllProjects() {
    this.filteredProjectsList = this.projectsList;
    this.current_subtopic = 'All Subtopics';
    this.current_fy = 'All Fiscal Years';
    this.current_status = 'All Statuses';
    this.current_type = 'All Types';
    this.current_csc = 'All CSCs';
  }

  isOnTopic(subtopic) {
    for (var topicSubtopic in this.subtopicsFilter) {
      if (subtopic == this.subtopicsFilter[topicSubtopic]['label']) {
        return true;
      }
    }
    return false;
  }

    ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.topic = params['topic'];
      this.page_title = this.topic_names[this.topic]
    });
    this.searchService.getTopics().subscribe(topics => {
      var topics = topics;
      for (var topic in topics) {
        if (topics[topic].label == this.page_title) {
           this.subtopicsFilter = topics[topic].subtopics;
        }
      }
    });
    this.localJson.loadTopic(encodeURIComponent(this.topic_names[this.topic])).subscribe(data => {
      this.projectsList = data;
      console.log(this.projectsList)
        for (var project in this.projectsList) {
          for (var subtopic in this.projectsList[project].topics) {
            if (this.subtopicsFilter != null) {
              for (var topicSubtopic in this.subtopicsFilter) {
                if ((this.projectsList[project].subtopics[subtopic] == this.subtopicsFilter[topicSubtopic]['label'])
                  && (this.subtopics.indexOf(this.projectsList[project].subtopics[subtopic]) < 0)) {
                  this.subtopics.push(this.projectsList[project].subtopics[subtopic])
                }
              }
            }
          }
          if (this.fiscal_years.indexOf(this.projectsList[project].fiscal_year) < 0) {
            this.fiscal_years.push(this.projectsList[project].fiscal_year)
          }
          if (this.statuses.indexOf(this.projectsList[project].status) < 0) {
            this.statuses.push(this.projectsList[project].status)
          }
          if (this.cscs.indexOf(this.projectsList[project].csc['name']) < 0) {
            this.cscs.push(this.projectsList[project].csc['name'])
          }
          if (this.projectsList[project].types) {
          for (var this_type of this.projectsList[project].types) {
            if (this.types.indexOf(this_type) < 0) {
              this.types.push(this_type)
            }
          } }
          this.subtopics.sort();
          this.fiscal_years.sort();
          this.statuses.sort();
          this.cscs.sort();
          this.filteredProjectsList.push(this.projectsList[project]);
          this.dataLoading = false;
      }
    });
  }




}
