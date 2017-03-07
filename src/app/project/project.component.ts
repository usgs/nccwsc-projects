import { Component, OnInit } from '@angular/core';
import { LocalJsonService } from '../local-json.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  private sub: any;
  private projectId: string;
  private cscId: string;
  private projectJson: any;
  constructor(private route: ActivatedRoute, private localJson: LocalJsonService, private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.projectId = params['id'];
      this.cscId = params['csc'];
    });
    this.localJson.loadProject(this.cscId, this.projectId).subscribe(data => {
       this.projectJson = data;
       console.log(this.projectJson);
    });
  }
}
