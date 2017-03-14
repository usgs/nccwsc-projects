import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { LocalJsonService } from '../local-json.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-csc',
  templateUrl: './csc.component.html',
  styleUrls: ['./csc.component.scss']
})

export class CscComponent implements OnInit {
  private sub: any;
  private sbId: any;
  private cscProjectsList = [];
  private filteredCscProjectsList = [];
  private topics = ['All Topics'];
  private fiscal_years = ['All Fiscal Years'];
  private statuses = ['All Statuses'];
  private current_topic = 'All Topics';
  private current_fy = 'All Fiscal Years';
  private current_status = 'All Statuses';

  constructor(private route: ActivatedRoute, private localJson: LocalJsonService, private router: Router) { }

  sortProjectsByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
  }

  filterProjectsList() {
    this.filteredCscProjectsList = [];   
    for (var project in this.cscProjectsList) {
      var display = true;
      console.log(this.current_topic);
      if (this.current_topic != 'All Topics') {
        for (var topic in this.cscProjectsList[project].topics) {
          var matched_topic = true;
          if (this.cscProjectsList[project].topics[topic] !== this.current_topic) {
             matched_topic = false;
          }
        }
        if (!matched_topic) {
          continue;
        }
      }
      if (this.current_fy != 'All Fiscal Years') {
        if (this.cscProjectsList[project].fiscal_year !== this.current_fy) {
          continue;
        }
      }
      if (this.current_status != 'All Statuses') {
        if (this.cscProjectsList[project].status !== this.current_status) {
          continue;
        }
      }      
      this.filteredCscProjectsList.push(this.cscProjectsList[project]);
      console.log(this.filteredCscProjectsList);
    }
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.sbId = params['id'];
    });
    
    this.localJson.loadCscProjects(this.sbId).subscribe(data => {
      this.cscProjectsList = data;
        for (var project in this.cscProjectsList) {
          for (var topic in this.cscProjectsList[project].topics) {
            if (this.topics.indexOf(this.cscProjectsList[project].topics[topic]) < 0) {
              this.topics.push(this.cscProjectsList[project].topics[topic])
            }
          }      
          if (this.fiscal_years.indexOf(this.cscProjectsList[project].fiscal_year) < 0) {
            this.fiscal_years.push(this.cscProjectsList[project].fiscal_year)
          }      
          if (this.statuses.indexOf(this.cscProjectsList[project].status) < 0) {
            this.statuses.push(this.cscProjectsList[project].status)
          }      
          this.topics.sort();
          this.fiscal_years.sort();
          this.statuses.sort();
          this.filteredCscProjectsList.push(this.cscProjectsList[project]);
      }
    });
  }

}