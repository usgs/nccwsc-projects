import { Component, OnInit } from '@angular/core';
import { LocalJsonService } from '../local-json.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  private sub: any;
  private sbId: any;
  private cscJson = new Array();
  private csc_title;

  constructor(private route: ActivatedRoute, private localJson: LocalJsonService, private router: Router) { }

  sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.sbId = params['id'];
    });
     this.localJson.loadCscProjects(this.sbId).subscribe(data => {
       this.sortByKey(data, 'title');
       this.cscJson = data;
       this.csc_title= this.cscJson[0].csc;
       console.log(this.cscJson);
       var csc_title = this.cscJson[0].csc;
           console.log(csc_title);


    });


  }

}
