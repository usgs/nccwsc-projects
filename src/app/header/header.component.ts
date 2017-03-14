import { Component, OnInit } from '@angular/core';
import { NccwscDrupalService } from '../nccwsc-drupal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private nccwscMenu;
  constructor(private nccwscDrupal: NccwscDrupalService) { }

  ngOnInit() {
     this.nccwscDrupal.loadMenu().subscribe(data => {
       this.nccwscMenu = data;
     });

  }

}
