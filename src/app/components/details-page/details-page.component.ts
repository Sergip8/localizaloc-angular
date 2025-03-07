import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CosmosdbService } from '../../services/cosmosdb.service';
import { DragScrollComponent, DragScrollItemDirective } from 'ngx-drag-scroll';
import { MapComponent } from "../shared/map/map.component";
import { CurrencyPipe, NgFor } from '@angular/common';
import { CardComponent } from '../common/card/card.component';
import { NearbyLocations } from '../../models/nearbyLocations';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [DragScrollComponent, DragScrollItemDirective, MapComponent, CurrencyPipe, CardComponent, NgFor],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.css'
})
export class DetailsPageComponent implements OnInit {


  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    ]
  };
  nearbyloc: NearbyLocations
  suggested:any 
  local: any
  constructor(private activatedRoute: ActivatedRoute, private cosmosService: CosmosdbService){
    this.activatedRoute.params.subscribe((params) => {
        console.log(params["id"])
        if(params["id"])
          this.getLocal(params["id"])
    })
  }
  ngOnInit(): void {
   
  }
  @ViewChild('nav', { read: DragScrollComponent }) ds!: DragScrollComponent;
  @ViewChild('suggest', { read: DragScrollComponent }) ds1!: DragScrollComponent;
  
getLocal(id: string){
this.cosmosService.getLocalById(id).subscribe({
  next: data => {
    console.log(data)
    this.local = data
    console.log(this.local.images)
     this.nearbyloc = {
      longitude: this.local.location.longitude,
      latitude: this.local.location.latitude,
      area: this.local.area,
      type: this.local.technicalSheet.property_type_name,
      operation: this.local.operation,
    } 
    this.cosmosService.getNearbyLocals(this.nearbyloc).subscribe({
      next: nL => {
        this.suggested = nL
        //this.barChartData.labels = 
      },
      error: e => console.log(e)
    })
  },
  error: e => console.log(e)
})
}
moveLeft() {
  this.ds.moveLeft();
}

moveRight() {
  if (this.ds.currIndex == this.local.images.length-1){
    this.ds.moveTo(0)
  }
  else
  this.ds.moveRight();
}
moveLeftS() {
  this.ds1.moveLeft();
}

moveRightS() {
  if (this.ds1.currIndex == this.suggested.length-1){
    this.ds1.moveTo(0)
  }
  else
  this.ds1.moveRight();
}
scroll0(){
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
}


