import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cscs',
  templateUrl: './cscs.component.html',
  styleUrls: ['./cscs.component.scss']
})
export class CscsComponent implements OnInit {

  csc_ids = [
    {'id': 'nccwsc', 'name' : 'NCCWSC'},
    {'id': 'alaska', 'name' : 'Alaska CSC'},
    {'id': 'north-central', 'name' : 'North Central CSC'},
    {'id': 'northeast', 'name' : 'Northeast CSC'},
    {'id': 'northwest', 'name' : 'Northwest CSC'},
    {'id': 'pacific-islands', 'name' : 'Pacific Islands CSC'},
    {'id': 'south-central', 'name' : 'South Central CSC'},
    {'id': 'southeast', 'name' : 'Southeast CSC'},
    {'id': 'southwest', 'name' : 'Southwest CSC'}
  ]

  topic_ids = [
    {'id': 'dought-fire-extremes', 'name': 'Drought, Fire and Extreme Weather'},
    {'id': 'education-modeling-tools', 'name': 'Education, Modeling and Tools'},
    {'id': 'landscapes', 'name': 'Landscapes'},
    {'id': 'native-communities', 'name': 'Native Communities'},
    {'id': 'water-ice', 'name': 'Water and Ice'},
    {'id': 'wildlife-plants', 'name': 'Wildlife and Plants'}
  ]

  constructor() { }

  ngOnInit() {
  }

}
