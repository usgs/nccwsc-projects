import { Component, OnInit } from '@angular/core';
import { NccwscDrupalService } from '../nccwsc-drupal.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private nccwscMenu;
  constructor(private nccwscDrupal: NccwscDrupalService) { }

  ngOnInit() {
     this.nccwscDrupal.loadMenu().subscribe(data => {

       data[0].url = "";
       this.nccwscMenu = data;
       console.log(data);
     });


  }

}
