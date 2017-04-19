import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { LeafletMapModel } from './map.model';
import * as L from 'leaflet';

@Component({
  selector: 'sb-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent {
  @Input() mapurl: string;
  LAYER_OCM: any;
  LAYER_OSM: any;
  model: any;
  shapename: any;
  shapename2: any;
  shapename3: any;
  projectshape_wms_url: any;
  sb_footprint: any;
  sb_boundingbox: any;
  sb_children: any;
  arrMapCenterLatLong: any;
  xms_capabilities;
  parseString = require('xml2js').parseString;
  
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
  this.shapename = 'sb:footprint';
  this.projectshape_wms_url = this.mapurl.replace(/service=wms&request=getcapabilities&version=1.3.0/, '');
        console.log(this.mapurl);
  //this.getWMSCapabilities(this.mapurl).then(data=>{
  
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

  this.sb_boundingbox = {
    id: 'sb_boundingbox',
    name: 'Bounding Box',
    enabled: true,
    layer: L.tileLayer.wms(this.projectshape_wms_url, {
          layers: this.shapename2,
          format: 'image/png',
          transparent: true,
          enabled: true})
    }

  this.sb_children = {
    id: 'sb_children',
    name: 'Children',
    enabled: true,
    layer: L.tileLayer.wms(this.projectshape_wms_url, {
          layers: this.shapename3,
          format: 'image/png',
          transparent: true,
          enabled: true})
    }

 //   })
  }
  

  getWMSCapabilities(mapUrl) {
    return this.http.get(mapUrl).toPromise()
      .then(response => {
        this.parseString(response.text(), function (err, result) {
          var object = result;
          if (typeof(object) != 'undefined') {
            this.xms_capabilties = object;
          }
        });
      })
      .catch(this.handleError);
  }

  defineModel() {
    // Form model object
    this.model = new LeafletMapModel(
      [ this.LAYER_OSM, this.LAYER_OCM ],
      this.LAYER_OCM.id,
      [ this.sb_footprint, this.sb_boundingbox, this.sb_children ]
    );
  }
  
  // Values to bind to Leaflet Directive
  layers: L.Layer[];
  //tileLayers:L.tileLayer[];
  layersControl: any;
  options = {
    zoom: 3,
    //center: L.latLng([ 56.37692652561914, -137.8891296838142 ])
    center: L.latLng([ 39.8282, -98.5795 ])
  };

  constructor(private http: Http) {
  }

  ngOnInit() {
    this.defineBaseLayers();
    this.defineOverlays();
    this.defineModel();
    this.onApply();
  }
  
  private handleError(error: any): Promise < any > {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  onApply() {
    // Get the active base layer
    let baseLayer = this.model.baseLayers.find((l) => { return l.id === this.model.baseLayer; });
    // Get all the active overlay layers
    let newLayers = this.model.overlayLayers
      .filter((l) => { return l.enabled; })
      .map((l) => { return l.layer; });
    newLayers.unshift(baseLayer.layer);
    this.layers = newLayers;
    this.layersControl = {
      baseLayers: {
        'Open Street Map': this.LAYER_OSM.layer,
        'Open Cycle Map': this.LAYER_OCM.layer
      },
      overlays: {
        'SB Footprint': this.sb_footprint.layer,
        'SB Bounding Box': this.sb_boundingbox.layer,
        'SB Children': this.sb_children.layer
      }

    };

    return false;
  }

}
