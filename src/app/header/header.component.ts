import { Component, OnInit } from '@angular/core';
import { NccwscDrupalService } from '../nccwsc-drupal.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  nccwscMenu;
  constructor(private nccwscDrupal: NccwscDrupalService) { }

  fixLink(link) {
    if ( link.substr(0, 24) == 'https://nccwsc.usgs.gov/') {
      return link.replace('https://nccwsc.usgs.gov/', '');
    } else {
      return link;
    }
  }

  ngOnInit() {
     this.nccwscDrupal.loadMenu().subscribe(data => {
       data[0].url = "";
       this.nccwscMenu = data;
     });


  }

}
