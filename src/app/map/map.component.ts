import { Component, OnInit, Input } from '@angular/core';

import { LeafletMapModel } from './map.model';

import * as L from 'leaflet';

@Component({
  selector: 'sb-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  @Input() mapurl: string;
  public LAYER_OCM: any;
  private LAYER_OSM: any;
  private model: any;
  private shapename: any;
  private projectshape_wms_url: any;
  private sb_footprint: any;

  defineBaseLayers(){
    this.LAYER_OCM = {
      id: 'opencyclemap',
      name: 'Open Cycle Map',
      enabled: true,
      layer: L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 18,
        attribution: 'Open Cycle Map'
      })
    };
    this.LAYER_OSM = {
      id: 'openstreetmap',
      name: 'Open Street Map',
      enabled: false,
      layer: L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 18,
        attribution: 'Open Street Map'
      })
    };
  }

  defineOverlays() {
  console.log('Building Overlays...');
  console.log(this.mapurl)
  this.shapename = 'sb:footprint';
  this.projectshape_wms_url = this.mapurl.replace(/service=wms&request=getcapabilities&version=1.3.0/, '');

  this.sb_footprint = {
    id: 'sb_footprint',
    name: 'Footprint',
    enabled: true,
    layer: L.tileLayer.wms(this.projectshape_wms_url, {
          layers: this.shapename,
          format: 'image/png',
          transparent: true,
          enabled: true})
    }
  }

  defineModel() {
    // Form model object
    this.model = new LeafletMapModel(
      [ this.LAYER_OSM, this.LAYER_OCM ],
      this.LAYER_OCM.id,
      [ this.sb_footprint ]
    );
  }

  // Values to bind to Leaflet Directive
  layers: L.Layer[];
  tileLayers:L.tileLayer[];
  layersControl: any;
  options = {
    zoom: 10,
    center: L.latLng([ 46.879966, -121.726909 ])
  };

  constructor() {
  }

  ngOnInit() {
    this.defineBaseLayers();
    this.defineOverlays();
    this.defineModel();
    this.onApply();
  }

  onApply() {
    // Get the active base layer
    let baseLayer = this.model.baseLayers.find((l) => { return l.id === this.model.baseLayer; });
    // Get all the active overlay layers
    let newLayers = this.model.overlayLayers
      .filter((l) => { return l.enabled; })
      .map((l) => { return l.layer; });
    newLayers.unshift(baseLayer.layer);
    console.log(newLayers)
    this.layers = newLayers;
    this.layersControl = {
      baseLayers: {
        'Open Street Map': this.LAYER_OSM.layer,
        'Open Cycle Map': this.LAYER_OCM.layer
      },
      overlays: {
        'SB Layer': this.sb_footprint.layer
      }

    };

    return false;
  }

}
