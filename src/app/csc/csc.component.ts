import { Component, Input, OnInit, Pipe, PipeTransform } from '@angular/core';
import { LocalJsonService } from '../local-json.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { TitleLinkComponent } from '../title-link/title-link.component';
import { Location } from '@angular/common';

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
  csc_url = environment.baseURL;
  topics = ['All Topics'];
  fiscal_years = ['All Fiscal Years'];
  statuses = ['All Statuses'];
  current_topic = 'All Topics';
  current_fy = 'All Fiscal Years';
  current_status = 'All Statuses';
  title = null;
  dataLoading = true;
  csc_ids = {
    '5050cb0ee4b0be20bb30eac0': 'National CASC',
    '4f831626e4b0e84f6086809b': 'Alaska CASC',
    '4f83509de4b0e84f60868124': 'North Central CASC',
    '4f8c648de4b0546c0c397b43': 'Northeast CASC',
    '4f8c64d2e4b0546c0c397b46': 'Northwest CASC',
    '4f8c650ae4b0546c0c397b48': 'Pacific Islands CASC',
    '4f8c652fe4b0546c0c397b4a': 'South Central CASC',
    '4f8c6557e4b0546c0c397b4c': 'Southeast CASC',
    '4f8c6580e4b0546c0c397b4e': 'Southwest CASC'
  }

  csc_english_ids = {
    'national-casc': '5050cb0ee4b0be20bb30eac0',
    'alaska': '4f831626e4b0e84f6086809b',
    'north-central': '4f83509de4b0e84f60868124',
    'northeast': '4f8c648de4b0546c0c397b43',
    'northwest': '4f8c64d2e4b0546c0c397b46',
    'pacific-islands': '4f8c650ae4b0546c0c397b48',
    'south-central': '4f8c652fe4b0546c0c397b4a',
    'southeast': '4f8c6557e4b0546c0c397b4c',
    'southwest': '4f8c6580e4b0546c0c397b4e'
  }

  settings = {
    columns: {
      fiscal_year: {
        title: 'Funding Year',
        // sortDirection:'desc',
        width: '8%',
      },
      title: {
        title: 'Title',
        type: 'custom',
        renderComponent: TitleLinkComponent,
      },
      investigators_formatted: {
        title: 'Principal Investigator(s)',
        type: 'html',
        width: '25%',
      },
      topics_formatted: {
        title: 'Topic(s)',
        width: '10%',
        type: 'html',
      },
      status: {
        title: 'Status',
        width: '7%',
      },
      contains: {
        title: 'Contains',
        type: 'html',
        width: '7%',
      }
    },
    actions: false,
    hideSubHeader: true,
    pager: {
      display: false
    }
    // this.source.setSort([{ field: 'id', direction: 'asc' }]);
  };

  constructor(private route: ActivatedRoute, private localJson: LocalJsonService, private router: Router, private location: Location, private aroute: ActivatedRoute) {
  }

  showAllProjects() {
    this.filteredCscProjectsList = [];
    for (var project in this.cscProjectsList) {
      this.filteredCscProjectsList.push(this.cscProjectsList[project]);
    }
  }

  sortProjectsByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
  }

  setButtonUrl() {
    // sets "Explore Other topics" btn urls (link back to main page).
    let buttonUrl = environment.baseURL;
    return buttonUrl;
  }

  filterProjectsList(event: any = null) {
    this.filteredCscProjectsList = [];
    // tslint:disable-next-line:forin
    for (var project in this.cscProjectsList) {
      var display = true;
      if (this.current_topic != 'All Topics' && this.cscProjectsList[project].topics != null) {
        var matched_topic = false;
        for (var topic in this.cscProjectsList[project].topics) {
          if (this.cscProjectsList[project].topics[topic].replace(/,/g, "").trim() == this.current_topic.replace(/,/g, "").trim()) {
            matched_topic = true;
            // Found our topic, let's check year and status.
            break;
          }
        }
        if (matched_topic == false) {
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
    this.updateUrl()
    this.sortList()
  }

  //TODO: put this code in a utility function/service
  updateUrl() {
    let params: any = { };
    if (this.current_topic != 'All Topics') {
      params['topic'] = this.current_topic
    }
    if (this.current_fy != 'All Fiscal Years') {
      params['year'] = this.current_fy
    }
    if (this.current_status != 'All Statuses') {
      params['status'] = this.current_status
    }
    const url = this
        .router
        .createUrlTree([params], {relativeTo: this.aroute})
        .toString();
    this.location.replaceState(url);
  }

  sortList () {
    this.filteredCscProjectsList.sort((a, b) => {
      // function sortByPI(a, b) {
      //   let api = a.contacts.principal_investigators[0].name;
      //   let bpi = b.contacts.principal_investigators[0].name;

      //   if(api == bpi) {
      //     return sortByTitle(a, b);
      //   }
      //   return (api < bpi) ? -1 : (api > bpi) ? 1 : 0;
      // }

      function sortByTitle(a, b) {
        if (a.title == b.title) {
          return 0;
        }
        return (a.title < b.title) ? -1 : 1;
      }

      // if (a.fiscal_year == b.fiscal_year) {
      //   return sortByPI(a, b);
      // }
      if (a.fiscal_year == b.fiscal_year) {
        return sortByTitle(a, b);
      }
      return (a.fiscal_year > b.fiscal_year) ? -1 : 1;
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      if (params['topic']) {
        this.current_topic = params['topic'];
      }
      if (params['year']) {
        this.current_fy = params['year'];
      }
      if (params['status']) {
        this.current_status = params['status'];
      }
    });
    if (this.id.length != 24) {
      this.sbId = this.csc_english_ids[this.id];
    } else {
      this.sbId = this.id;
    }
    this.title = this.csc_ids[this.sbId];
    this.localJson.loadCscProjects(this.sbId).subscribe(data => {
      this.cscProjectsList = data;
        // tslint:disable-next-line:forin
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
          this.dataLoading = false;


          // principal investigators
          this.cscProjectsList[project].investigators_formatted = '';

          for (var pi of this.cscProjectsList[project].contacts.principal_investigators) {
            this.cscProjectsList[project].investigators_formatted = this.cscProjectsList[project].investigators_formatted + pi.name + '<i>(' + pi.organization + '</i>)<br>';
          }

          // topics
          this.cscProjectsList[project].topics_formatted = '';
          for (var t of this.cscProjectsList[project].topics) {
            this.cscProjectsList[project].topics_formatted = this.cscProjectsList[project].topics_formatted + t + '<br>';
          }

          // contains
          this.cscProjectsList[project].contains = '<div align="center">';

          if (this.cscProjectsList[project].hasFolders) {
            this.cscProjectsList[project].contains += '<i class="fa fa-folder fa-lg" title="This project has products." aria-hidden="true"></i>';
          }
          if (this.cscProjectsList[project].hasMaps) {
            this.cscProjectsList[project].contains += '&nbsp&nbsp<i class="fa fa-map fa-lg" title="This project has maps." aria-hidden="true"></i>';
          }
          this.cscProjectsList[project].contains += '</div>'
          // status
          if (!this.cscProjectsList[project].status) {
            this.cscProjectsList[project].status = 'N/A';
          }
        }

      this.filterProjectsList()
      this.sortList()

    });
  }


}
