import { CurrencyPipe, NgIf, PercentPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MapComponent } from "../../shared/map/map.component";
import { DefaultImageDirective } from '../../directives/default-image.directive';

@Component({
    selector: 'app-card',
    imports: [CurrencyPipe, RouterLink, DefaultImageDirective, PercentPipe],
    templateUrl: './card.component.html',
    styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
onMap() {
  this.showMap = !this.showMap 
}
mouseOver() {
  console.log("over")
}

  showMap = false
  @Input() data:any

  constructor(){
    
  }
  ngOnInit(): void {
    
  }
}
