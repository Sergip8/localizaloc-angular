import { CurrencyPipe, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MapComponent } from "../../shared/map/map.component";
import { DefaultImageDirective } from '../../directives/default-image.directive';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, MapComponent, DefaultImageDirective],
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
