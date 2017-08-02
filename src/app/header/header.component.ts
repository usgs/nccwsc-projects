import { Component, OnInit } from '@angular/core';
import { NccwscDrupalService } from '../nccwsc-drupal.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  
  nccwscMenu;
  isNavbarCollapsed:boolean = true;
  isCollapsed = true
  baseURL: string
  constructor(private nccwscDrupal: NccwscDrupalService) { }

  fixLink(link) {
    if (link == environment.baseURL) {
      return link
    }
    let url_prefix = "";
    if (link.substr(0, environment.baseURL.length) == environment.baseURL) {
      if (link.substr(0, environment.baseURL.length + environment.projectsPath.length) == environment.baseURL + environment.projectsPath) {
        return link
      } else {
        return link.replace(environment.baseURL + '/', '/')
      }
    } else {
      return environment.baseURL + '/' + link
    }
  }

  ngOnInit() {
     this.nccwscDrupal.loadMenu().subscribe(data => {
       data[0].url = environment.baseURL     
       this.nccwscMenu = data;
     });
     this.baseURL = environment.baseURL
  }
}
