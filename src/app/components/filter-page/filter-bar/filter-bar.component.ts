import { Component, OnInit } from '@angular/core';
import { SelectComponent } from '../../common/select/select';
import { SelectCheckComponent } from '../../common/select/select-check';
import { SelectData } from '../../common/select/selectModel';
import { Filter } from '../../../models/filter';
import { CosmosdbService } from '../../../services/cosmosdb.service';
import { CardComponent } from "../../common/card/card.component";
import { NgClass, NgFor, Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterTopbarComponent } from "./filter-topbar";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MapComponent } from '../../shared/map/map.component';
import { barrios_bogota, localidades } from '../../../models/locations';
import { SpinnerComponent } from '../../common/spinner/spinner.component';
import { PaginationComponent } from '../../common/pagination/pagination';
import { FormRangeComponent } from "../../common/form-range/form-range";
import { SearchComponent } from "../../common/form-range/form-search.component";
import { Pagination } from '../../../models/pagination';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [
    SelectComponent,
    SelectCheckComponent,
    CardComponent,
    NgFor, NgClass,
    FilterTopbarComponent,
    ReactiveFormsModule,
    MapComponent,
    SpinnerComponent,
    PaginationComponent,
    FormRangeComponent,
    SearchComponent
],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.css'
})
export class FilterBarComponent implements OnInit {
  
  
  currentUrl: string;
  pagination: Pagination
  mapIdSelected = -1

filterOperation(operation: string) {
  if (this.currentUrl.includes("arriendo")){
    this.location.replaceState(this.currentUrl.replace("arriendo", operation.toLowerCase()));
  }else{
    this.location.replaceState(this.currentUrl.replace("venta", operation.toLowerCase()));
  }
 this.filterParams.operation = operation
 this.getAllItems()
}
filterArea(range: any) {
  this.filterParams.areaMin = range["min"]
  this.filterParams.areaMax = range["max"]
  console.log(this.filterParams)
  this.getAllItems()
}
filterBarrio(barrio: string[]) {
  this.filterParams.barrio = barrio
  this.getAllItems()
}

  filterPrice(range: any) {
    this.filterParams.min = range["min"]
    this.filterParams.max = range["max"]
    this.getAllItems()
}
filterType(type: string[]){
  this.filterParams.type = type
  this.typeList.forEach(_ =>{
    if (this.currentUrl.includes(_.toLowerCase())){
      this.location.replaceState(this.currentUrl.replace(_.toLowerCase(), type.map(t => t.toLowerCase()).join('-')));
    }
    else{
      const currentUrlSplit = this.currentUrl.split("/")
      if (currentUrlSplit.length == 3)
        this.location.replaceState(currentUrlSplit[0]+"/"+currentUrlSplit[1]+"/"+ type.map(t => t.toLowerCase()).join('-') + "/"+ currentUrlSplit[2]);
      if (currentUrlSplit.length == 2)
        this.location.replaceState(this.currentUrl+"/"+ type.map(t => t.toLowerCase()).join('-'));
    }

  })
  
  this.getAllItems()
}
  formGroup: FormGroup 
filterEstrato(estrato: any[]) {

  this.filterParams.estrato = estrato
  this.getAllItems()
}
getOrder(order: any) {
  this.filterParams.order = order
  this.getAllItems()
}
paramType = ""

constructor(
  private cosmosService: CosmosdbService, 
  private router: Router, 
  private formBuilder: FormBuilder, 
  private route: ActivatedRoute,
  private location: Location){
    this.currentUrl = this.router.url;
    const navigation = this.router.getCurrentNavigation();
    if(navigation?.extras?.state)
      this.paramType = navigation?.extras?.state["paramType"] ;
  this.formGroup = this.formBuilder.group({
    min: [null, [Validators.required, Validators.pattern("[0-9]+")]],
    max: [null, [Validators.required, Validators.pattern("[0-9]+")]],
  });
}

gotoMap() {
  this.router.navigate(["map"])
}
gotoPage(page: number) {

 this.filterParams.page = page -1
 console.log(this.filterParams)
 
  this.getAllItems()
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
nextPage() {
}

  ngOnInit(): void {
   
    this.route.params.subscribe(params => {
      this.filterParams.operation = params['operation'];
      if(params['location']){
        console.log(params['location'])
        this.filterParams.type= params['type'].split("-") || null;
        this.filterParams.location = params['location'] || null;
      }
      else{
        if(this.paramType == "type")
          this.filterParams.type= params['type'].split("-") || null;

        if(this.paramType == "location")
          this.filterParams.location = params['type'] || null;
      }
    });
    console.log(this.paramType)
    console.log(this.filterParams)
    this.getAllItems()
  }
  loading = false
  locals: any
  filterParams = new Filter()
  continuationToken:string[] = []
  size = 20
  count = 0
  order:string|null = null 
  isList = true
  lastCT = false

setMultiTagValue($event: string[]) {
  console.log($event)
}
typeList = ["Local", "Oficina", "Bodega"]

  type: SelectData = {
    default: "tipo de inmueble",
    type: "multiple",
    search: false,
    showLabel: true,
    list: this.typeList,
  };
  estrato: SelectData = {
    default: "estrato",
    type: "multiple",
    search: false,
    showLabel: true,
    list: [1,2,3,4,5,6],
  };
  operation: SelectData = {
    default: "operacion",
    type: "single",
    search: false,
    showLabel: true,
    list: ["Arriendo", "Venta"],
  };
  barrio: SelectData = {
    default: "barrio",
    type: "multiple",
    search: true,
    showLabel: true,
    list: barrios_bogota
  };
  
  pages = [1,2,3]
  pageSelected = 1
  tokenPage = ""
  getAllItems(){
    this.loading =true
    this.cosmosService.getTableSelected(this.filterParams).subscribe({
      next: data => {
        this.locals = data.documents
        this.count = data.count
        this.loading = false
        this.pagination = {
          count: data.count,
          page: this.filterParams.page + 1,
          size: this.size
        }
        // this.count = data.count
        // if (data.continuationToken == null){
        //   this.lastCT = true
        // }
        // if (!this.lastCT)
        //   this.continuationToken.push(data.continuationToken)
        // console.log(this.continuationToken)
        // this.loading = false
        console.log(data)
      },
      error: e => { 
        this.loading = false
        console.log(e)},  
    })
  } 
  onMap(id: number){
    if(id == this.mapIdSelected)
      this.mapIdSelected = -1
    else
    this.mapIdSelected = id
    
  }
}
