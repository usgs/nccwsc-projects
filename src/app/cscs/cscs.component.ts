import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cscs',
  templateUrl: './cscs.component.html',
  styleUrls: ['./cscs.component.scss']
})
export class CscsComponent implements OnInit {

  csc_ids = [
    {'id': 'national-casc', 'name' : 'National CASC'},
    {'id': 'alaska', 'name' : 'Alaska CASC'},
    {'id': 'north-central', 'name' : 'North Central CASC'},
    {'id': 'northeast', 'name' : 'Northeast CASC'},
    {'id': 'northwest', 'name' : 'Northwest CASC'},
    {'id': 'pacific-islands', 'name' : 'Pacific Islands CASC'},
    {'id': 'south-central', 'name' : 'South Central CASC'},
    {'id': 'southeast', 'name' : 'Southeast CASC'},
    {'id': 'southwest', 'name' : 'Southwest CASC'}
  ]

  topic_ids = [
    {'id': 'drought-fire-extremes', 'name': 'Drought, Fire and Extreme Weather'},
    {'id': 'science-tools', 'name': 'Science Tools for Managers'},
    {'id': 'landscapes', 'name': 'Landscapes'},
    {'id': 'native-communities', 'name': 'Native Communities'},
    {'id': 'water-coasts-ice', 'name': 'Water, Coasts and Ice'},
    {'id': 'wildlife-plants', 'name': 'Wildlife and Plants'}
  ]

  constructor() { }

  ngOnInit() {
  }

}
