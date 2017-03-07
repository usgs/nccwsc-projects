import { Component, OnInit } from '@angular/core';
import { LocalJsonService } from '../local-json.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit {
  sub = null;
  topic = null;
  topics = {
    'dought-fire-extremes': '588244b0e4b0b3d9add24391',
    'education-modeling-tools': '588247c7e4b0b3d9add243a5',
    'landscapes': '5882456be4b0b3d9add24395',
    'native-communities': '588246dae4b0b3d9add243a1',
    'water-ice': '5882464ce4b0b3d9add2439a',
    'wildlife-plants': '58824220e4b0b3d9add2438b'
  }
  private topicKeys;
  private projectsJson = {};

  constructor(private route: ActivatedRoute, private localJson: LocalJsonService, private router: Router) { }

  loadProject(csc, sb_id) {
    let link = ['/project', csc, sb_id];
    this.router.navigate(link);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.topic = params['topic'];
    });
    this.localJson.loadTopic(this.topics[this.topic]).subscribe(data => {
       this.projectsJson = data;
       this.topicKeys = Object.keys(this.projectsJson);
       console.log(this.projectsJson);
    });
  }

}
