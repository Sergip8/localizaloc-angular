import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Map,tileLayer, marker, popup, divIcon, layerGroup, featureGroup, geoJSON, icon, Marker} from 'leaflet';
import { tileLayers } from '../map/data';
import { NgStyle } from '@angular/common';

import { HttpClient } from '@angular/common/http';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;

@Component({
    selector: 'app-map',
    standalone: true,
    imports: [NgStyle],
    templateUrl: './map.component.html',
    styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit, OnChanges, OnInit {


  ngOnChanges(changes: SimpleChanges): void {

      console.log(changes["localDataList"])
      if(!this.localData){
        this.localDataList = changes["localDataList"]["currentValue"]
        if (changes["localDataList"]["previousValue"]){
          this.locations = []
          this.bares_rest.clearLayers()
          this.fg.clearLayers()
          this.multiMarks()
          this.onMapReady()
        }

      }
      else{
        this.localData = changes["localData"]["currentValue"]
        if (changes["localData"]["previousValue"]){
          this.map.setView([this.localData.location.latitude, this.localData.location.longitude], 17);
          this.locations = []
          //this.bares_rest.clearLayers()
          this.fg.clearLayers()
          this.singleMark()
          this.onMapReady()
        }

      }
      
  }
  
  svgIcon = divIcon({
    html: `
   <svg height="40px" width="40px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
 viewBox="0 0 512.001 512.001" xml:space="preserve">
<path style="fill:#51AA5B;" d="M256.002,8.432c0,0-167.172,77.825-167.172,254.16c0,110.344,74.846,172.607,167.172,172.607
s167.172-62.263,167.172-172.607C423.174,86.257,256.002,8.432,256.002,8.432z"/>
<path style="fill:#7A1B2E;" d="M403.922,145.135c-14.243-29.164-34.076-56.474-58.949-81.173
c-42.255-41.958-83.99-61.642-85.746-62.461L256.002,0l-3.227,1.502c-1.756,0.817-43.49,20.503-85.746,62.461
c-24.873,24.698-44.706,52.008-58.949,81.173C90.234,181.681,81.184,221.2,81.184,262.593c0,54.56,17.733,100.608,51.284,133.167
c29.629,28.754,70.548,45.263,115.888,46.933v69.308h15.288v-69.308c45.34-1.669,86.259-18.179,115.888-46.933
c33.551-32.559,51.284-78.607,51.284-133.167C430.818,221.199,421.769,181.68,403.922,145.135z M398.573,171.021L263.646,305.947
V216.77l103.454-103.454c8.885,12.398,16.607,25.263,23.084,38.527C393.261,158.143,396.052,164.538,398.573,171.021z
 M263.646,21.125c8.894,5.037,22.493,13.415,37.958,25.269l-37.958,37.957V21.125z M248.357,84.351l-37.951-37.951
c15.448-11.835,29.052-20.22,37.951-25.265V84.351z M357.779,101.017l-94.133,94.133v-89.177l49.953-49.953
c6.74,5.658,13.674,11.912,20.603,18.791C342.694,83.244,350.553,91.993,357.779,101.017z M121.681,152.125
c13.428-27.584,32.186-53.472,55.751-76.947c7.047-7.019,14.11-13.396,20.976-19.155l49.95,49.95v89.177l-58.159-58.159
l-10.81,10.81l68.968,68.968v89.176l-91.814-91.814l-10.81,10.81l102.624,102.624v89.177l-151.86-151.86
c-0.007-0.763-0.023-1.524-0.023-2.291C96.474,223.651,104.954,186.484,121.681,152.125z M97.921,287.928l138.623,138.623
c-36.565-3.788-69.229-18.28-93.427-41.762C117.875,360.292,102.489,327.139,97.921,287.928z M368.886,384.788
c-24.197,23.483-56.862,37.974-93.427,41.762l62.295-62.295l-10.81-10.81l-63.299,63.299v-89.177l140.519-140.519
c7.539,24.18,11.365,49.46,11.365,75.543c0,0.767-0.015,1.527-0.023,2.291l-74.148,74.148l10.81,10.81l61.914-61.914
C409.515,327.139,394.128,360.292,368.886,384.788z"/>
<path style="fill:#95E49C;" d="M127.05,262.592h-15.288c0-66.794,25.843-126.323,76.811-176.933l10.772,10.849
C151.374,144.142,127.05,200.02,127.05,262.592z"/>
</svg>
  `,
    className: "svg-icon",
    iconSize: [24, 40],
    iconAnchor: [12, 40],
    popupAnchor: [8, -30]
  });
  private map
  fg = featureGroup()
  bares_rest = featureGroup()
  locations = []

  @Input() localData: any
  @Input() localDataList: any

  constructor(private http: HttpClient){

  }
  formatPrice(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value);
  }
  json: any
  feature: L.GeoJSON;
  countries: Array<L.Layer> = [];
  ngOnInit() {
   
  }

  ngAfterViewInit() {
    console.log(this.localData)
    this.map = new Map('map')
    if (this.localData){
      this.map.setView([this.localData.location.latitude, this.localData.location.longitude], 15);
      
    }
    else{
      this.map.setView([4.635751, -74.0637856], 12);
    }
    
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    
    
    if (this.localDataList){
      this.multiMarks()
    }
    if (this.localData){
      this.singleMark()
    }
    this.onMapReady()
    
    };
    multiMarks(){
      this.fg.addTo(this.map);
      this.localDataList.forEach(element => {
          this.filterNearbyLocations([element.location.latitude, element.location.longitude])
         const m =  marker([element.location.latitude, element.location.longitude], {icon: this.svgIcon})
          .bindPopup(`
            <h2> ${element.title} </h2>
            <div>${element.technicalSheet.m2Built} m<sup>2</sup></div>
            <div class="price">${this.formatPrice(element.costs.total_amount)}</div>
            <div>${element.location.barrio}</div>
            <hr>
            `, );
            m.addTo(this.fg)
          });      
          // <a href="/details/${element.id}">ir a detalles</a>
      }
      singleMark(){
        if (this.localData){
          this.filterNearbyLocations([this.localData.location.latitude, this.localData.location.longitude])
          marker([this.localData.location.latitude, this.localData.location.longitude], {icon: this.svgIcon}).addTo(this.map)
          .bindPopup(`
            <h2> ${this.localData.title} </h2>
            <div>${this.localData.technicalSheet.m2Built}
            <div class="price">${this.formatPrice(this.localData.costs.total_amount)}</div>
            <div>${this.localData.location.barrio}</div>
            <hr>
           
            `, )
            .addTo(this.fg)
          
        }
      }
      
      onMapReady() {
        
        this.bares_rest.addTo(this.map)
        this.http.get('assets/geojson/puntos_interes.geojson').subscribe((json: any) => {
          this.json = json;
          console.log(json.features[0].properties)
          for (const c of json.features) {
        
            for (const l of this.locations){
             
              if (l[1] < c.geometry.coordinates[1] && l[0] > c.geometry.coordinates[1] && l[3] < c.geometry.coordinates[0] && l[2] > c.geometry.coordinates[0]){

                const lon = c.geometry.coordinates[0];
                const lat = c.geometry.coordinates[1];
                const mark = marker([lat, lon]).bindPopup(`
                <h2> ${c.properties.NGeNombre.toLowerCase()} </h2>
               
                `);
                mark.addTo(this.bares_rest);
              }
            }
          }    
      
        });
    
        // map.on('click', <LeafletMouseEvent>(e) => { console.log(e.latlng) });
        
      }
  filterNearbyLocations(coord: any, distance = 0.2){
    const latN = coord[0] + (distance/111.32)
    const latS = coord[0] - (distance/111.32)
    const lonE = coord[1] + (distance/111.32*Math.cos((coord[0]*3.1416)/180))
    const lonO = coord[1] - (distance/111.32*Math.cos((coord[0]*3.1416)/180))

    this.locations.push([latN, latS, lonE, lonO])
  }
}
