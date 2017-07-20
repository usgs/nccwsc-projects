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
  constructor(private nccwscDrupal: NccwscDrupalService) { }

setTitleUrl(){
  // sets header urls
let titleURL = "";
   if (environment.production==false){
          titleURL = "https://my-beta.usgs.gov/nccwsc";
       }
   else{
      titleURL = "https://nccwsc.usgs.gov/";
   }

return titleURL;
}





  fixLink(link) {
     // sets url prefix deppending if it prod or beta
let url_prefix = "";
      if (environment.production==false){
             url_prefix = "/nccwsc/";
          }
      else{
         url_prefix = "/";
      }

    if ((link.substr(0, 24) == 'https://nccwsc.usgs.gov/')  || (link.substr(0, 32) == 'https://my-beta.usgs.gov/nccwsc/')) {
      if ((link.substr(0,43) == 'https://my-beta.usgs.gov/nccwsc/projects/#/') || (link.substr(0, 35) == 'https://nccwsc.usgs.gov/projects/#/')) {
// angular app links
        return link
      } else {
        return link.replace('https://nccwsc.usgs.gov/', '/');
      }
    } else {
  //node/# links
        return url_prefix + link;
      }
  }

  ngOnInit() {

     this.nccwscDrupal.loadMenu().subscribe(data => {
       data[0].url = "//";
       this.nccwscMenu = data;
       console.log(this.nccwscMenu)
     });
  }
}
