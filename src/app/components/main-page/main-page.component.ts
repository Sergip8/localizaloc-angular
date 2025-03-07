import { Component, HostListener, OnInit } from '@angular/core';
import { SelectComponent } from '../common/select/select';
import { FooterComponent } from "../shared/footer/footer.component";
import { SelectCheckComponent } from "../common/select/select-check";
import { SelectData } from '../common/select/selectModel';
import { NgClass, NgFor } from '@angular/common';
import { CosmosdbService } from '../../services/cosmosdb.service';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { MapComponent } from "../shared/map/map.component";
import { CardMainComponent } from "./card-main.component";
import { SearchComponent } from "../common/form-range/form-search.component";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [SelectComponent, FooterComponent, SelectCheckComponent, NgClass, FormsModule, NgFor, MapComponent, CardMainComponent, SearchComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit{
showMap = false;
gotoResults(loc) {
  const type = this.typeStr.join("-").toLowerCase()
  const location = loc
  let paramType: "type"|"location" = "type"
  const navigationParams =[this.operation]
  if (type != ""){
    navigationParams.push(type)
    paramType = "type"
  }
  if (location != ""){
    navigationParams.push(location.replace("/", "_"))
    paramType = "location"
  }
  if (location != "" || type != ""){
    console.log(navigationParams)
    this.router.navigate(navigationParams, { state: { paramType: paramType } });
  }
  else
  this.router.navigate(navigationParams)
}

  typeStr = []
  
  isDropdownOpen = false;
  cities: any
  barrio: any
  suggested:any[] = []

constructor(private cosmosService: CosmosdbService, private router: Router){}
  ngOnInit(): void {
    this.getSuggested()
  }

sold() {
  this.operation = "venta"
}
rent() {
  this.operation = "arriendo"
}
  operation = "arriendo"

  type: SelectData = {
    default: "tipo de inmueble",
    type: "multiple",
    search: false,
    showLabel: false,
    list: ["Local", "Oficina", "Bodega"],
  };
  @HostListener("document:click", ["$event"])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickInside = target.closest(`.relative`);
    
    if (!clickInside) {
      this.isDropdownOpen = false;
    }
  }
  getSuggested(){
    this.cosmosService.getHomeSuggested().subscribe({
      next: data => {
        this.suggested = data.documents
      },
      error: e => console.log(e)
    })
  }

}
