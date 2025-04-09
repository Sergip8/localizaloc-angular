import { Component, HostListener, OnInit } from '@angular/core';
import { SelectComponent } from '../common/select/select';
import { FooterComponent } from "../shared/footer/footer.component";
import { SelectCheckComponent } from "../common/select/select-check";
import { SelectData } from '../common/select/selectModel';
import { NgClass, NgFor } from '@angular/common';
import { CosmosdbService } from '../../services/cosmosdb.service';
import { FormsModule, NgModel } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { MapComponent } from "../shared/map/map.component";
import { CardMainComponent } from "./card-main.component";
import { SearchComponent } from "../common/form-range/form-search.component";
import { PromptComponent } from '../common/form-range/form-prompt';
import { Filter } from '../../models/filter';

@Component({
    selector: 'app-main-page',
    imports: [SelectCheckComponent, NgClass, FormsModule, CardMainComponent, SearchComponent, PromptComponent],
    templateUrl: './main-page.component.html',
    styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit{
executePrompt(prompt: string) {
  this.getPropertyType(prompt)
}
filter: Filter
showMap = false;
gotoResults(loc: any) {
  const type = this.typeStr.join("-").toLowerCase()
  const location = loc.url_frag
  const navigationParams =[this.operation]
  if (type != ""){
    navigationParams.push(type)
  }
  if (loc != ""){
    this.router.navigate(navigationParams, { queryParams: { location: loc } })
  }
  else
  this.router.navigate(navigationParams)
  
}
  typeStr = ["Local"]
  
  isDropdownOpen = false;
  cities: any
  barrio: any
  suggested:any[] = []
  loading = false

constructor(private cosmosService: CosmosdbService, private router: Router){
  
}
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
  getPropertyType(prompt: string){
    this.loading = true
    this.cosmosService.getPromptResults(prompt).subscribe({
      next: data => {
        console.log(data)
        this.filter = data.filter
        console.log(this.filter)
        const type_route = this.filter.type.join("-").toLowerCase()
        let navigationExtras: NavigationExtras = {
          state: {
            filter: this.filter
          }
        };
        this.router.navigate([this.filter.operation, type_route], navigationExtras)
      },
      error: e => console.log(e),
      complete: () => this.loading = false
  })

}
}
