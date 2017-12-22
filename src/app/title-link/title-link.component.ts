import {Component, Input, OnInit, Pipe, PipeTransform} from '@angular/core';
import {ViewCell} from "ng2-smart-table";

@Component({
  selector: 'app-title-link',
  template: `
    <a href="{{href}}">{{value}}</a>
  `,
})
export class TitleLinkComponent implements ViewCell, OnInit {
  // renderValue;
  href: string;

  @Input() value: string | number;
  @Input() rowData: any;

  ngOnInit() {


    if (this.rowData.types == "Project") {
      this.href = '#/project/' + this.rowData.csc['id'] + '/' + this.rowData.id;}

    else {
      this.href = '#/component/' + this.rowData.id;

    }

  }


}
