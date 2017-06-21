import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { LocalJsonService } from '../local-json.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-csc',
  templateUrl: './csc.component.html',
  styleUrls: ['./csc.component.scss']
})

export class CscComponent implements OnInit {
  sub: any;
  id: any;
  sbId: any;
  cscProjectsList = [];
  filteredCscProjectsList = [];
  csc_url = ['https://my-beta.usgs.gov/nccwsc/csc-list'];
  topics = ['All Topics'];
  fiscal_years = ['All Fiscal Years'];
  statuses = ['All Statuses'];
  current_topic = 'All Topics';
  current_fy = 'All Fiscal Years';
  current_status = 'All Statuses';
  title = null;
  dataLoading = true;
  csc_ids = {
    '5050cb0ee4b0be20bb30eac0' : 'NCCWSC',
    '4f831626e4b0e84f6086809b' : 'Alaska CSC',
    '4f83509de4b0e84f60868124' : 'North Central CSC',
    '4f8c648de4b0546c0c397b43' : 'Northeast CSC',
    '4f8c64d2e4b0546c0c397b46' : 'Northwest CSC',
    '4f8c650ae4b0546c0c397b48' : 'Pacific Islands CSC',
    '4f8c652fe4b0546c0c397b4a' : 'South Central CSC',
    '4f8c6557e4b0546c0c397b4c' : 'Southeast CSC',
    '4f8c6580e4b0546c0c397b4e' : 'Southwest CSC'
  }

  csc_english_ids = {
    'nccwsc' : '5050cb0ee4b0be20bb30eac0',
    'alaska' : '4f831626e4b0e84f6086809b',
    'north-central' : '4f83509de4b0e84f60868124',
    'northeast' : '4f8c648de4b0546c0c397b43',
    'northwest' : '4f8c64d2e4b0546c0c397b46',
    'pacific-islands': '4f8c650ae4b0546c0c397b48',
    'south-central' : '4f8c652fe4b0546c0c397b4a',
    'southeast' : '4f8c6557e4b0546c0c397b4c',
    'southwest' : '4f8c6580e4b0546c0c397b4e'
  }

  constructor(private route: ActivatedRoute, private localJson: LocalJsonService, private router: Router) { }

  showAllProjects() {
    this.filteredCscProjectsList = [];
    for (var project in this.cscProjectsList) {
      this.filteredCscProjectsList.push(this.cscProjectsList[project]);
    }
  }

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
    }
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    if (this.id.length != 24) {
      this.sbId = this.csc_english_ids[this.id];
    } else {
      this.sbId = this.id;
    }
    this.title = this.csc_ids[this.sbId];
    this.localJson.loadCscProjects(this.sbId).subscribe(data => {
      console.log(data)
      this.cscProjectsList = data;
        for (var project in this.cscProjectsList) {
          for (var topic in this.cscProjectsList[project].topics) {
            if (this.topics.indexOf(this.cscProjectsList[project].topics[topic]) < 0) {
              this.topics.push(this.cscProjectsList[project].topics[topic])
            }
            this.sortProjectsByKey(this.cscProjectsList, 'fiscal_year')
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
          this.dataLoading = false;
      }
    });
  }

}