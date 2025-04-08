import { Component, EventEmitter, HostListener, Input, OnInit, Output, SimpleChanges } from "@angular/core";
import { CosmosdbService } from "../../../services/cosmosdb.service";
import { FormsModule } from "@angular/forms";
import { NgClass, NgFor, NgIf } from "@angular/common";



@Component({
    selector: 'app-search',
    imports: [FormsModule, NgClass, NgFor, NgIf, NgClass],
    template: `
    <div class="relative">

<input 
   (input)="location($event)"                                  
    [(ngModel)]="loc"
    name="search"
    [placeholder]="placeholder"
    [ngClass]="{'pe-10': isFilter, 'pe-5': !isFilter}"
    class="bg-white dark:bg-gray-800 h-9 flex ps-5 pe-10 w-full text-sm focus:outline-none border-1 dark:border-gray-600"
    autocomplete="off" 
    spellcheck="false" 
    required 
    step="any" 
    autocapitalize="none" 
    autofocus />
  @if (isFilter) {
<button 
    type="buttom" 
    (click)="gotoResults.emit(loc)"
    class="absolute inset-y-0 right-0 mr-2 flex items-center px-2">
    <svg 
        class="h-4 w-4 fill-current dark:text-white" 
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink" 
        version="1.1" id="Capa_1" x="0px" y="0px"
        viewBox="0 0 56.966 56.966" 
        xml:space="preserve" 
        width="512px" 
        height="512px">
         <path
             d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
    </svg>
</button>
  }
<div
 [ngClass]="{
   'transition ease-out duration-300 transform opacity-100 scale-100': isDropdownOpen,
   'transition ease-in duration-75 transform opacity-0 scale-0': !isDropdownOpen
 }"
 class="absolute mt-1 w-64 bg-slate-200 shadow-lg z-10 items-start text-start"
>
@for (location of location_str; track $index) {
 

  <div *ngFor="let l of location.location">
  <div (click)="locSelected(l)" class="cursor-pointer block px-4 py-2 dark:text-gray-100 mr-4">
   <div *ngIf="location.type == 'ciudad'">
    <div class=" text-sm font-semibold">
      {{ l?.ciudad}},
      <span class="text-xs font-light"> ciudad</span>

    </div>
   </div>
   <div *ngIf="location.type == 'localidad'">
    <div class=" text-sm font-semibold">
      {{ l?.localidad_normalized}}, 
      <span class="text-xs font-light"> localidad</span>
    </div>
    <div >
       {{ l?.ciudad }} <span class="text-xs font-light"> ciudad</span>

    </div>
   </div>
   <div *ngIf="location.type == 'barrio'">
    <div class=" text-sm font-semibold">
      {{ l?.barrio_normalized}}, 
      <span class="text-xs font-light"> barrio</span>

    </div>
<div class="text-xs ">
   {{ l?.localidad_normalized }} <span class="text-xs font-light">localidad</span> {{ l?.ciudad }} <span class="text-xs font-light">ciudad</span>

</div>
   </div>
  </div>
  
  </div>
 }
</div>
</div>
    `,
    styles: [`    
    `]
})
  export class SearchComponent implements OnInit {

    isDropdownOpen = false;
    location_str = []
    loc = ""

    constructor(private cosmosService: CosmosdbService){}
  ngOnInit(): void {
    if (this.set_location != "")
      this.loc = this.set_location
  }
    @Output() gotoResults = new EventEmitter<string>()
    @Input() placeholder: string = "Search"
    @Input() set_location: string = ""
    @Input() isFilter: boolean = true

    @HostListener("document:click", ["$event"])
    onClick(event: MouseEvent) {
      const target = event.target as HTMLElement;
      const clickInside = target.closest(".relative");
      
      if (!clickInside) {
        this.isDropdownOpen = false;
      }
    }
    location(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        if (inputElement.value.length >2){
          this.isDropdownOpen = true;
          // this.cosmosService.getSuggestedLocation(inputElement.value).subscribe({
      
          //   next: data => this.cities = data.cities
          // })
          this.cosmosService.getBarrios(inputElement.value).subscribe({
      
            next: data => {
              console.log(data)
              this.location_str = data.data
            }
          })
        }
        else{
          this.isDropdownOpen = false
          this.location_str = []
        }
      }
    locSelected(locSelect: any) {
      console.log(locSelect)
    this.loc = (locSelect?.ciudad +"/"+ (locSelect?.localidad_normalized || '') +"/"+ (locSelect?.barrio_normalized || '')).replace(/\/+$/, '');
    console.log(this.loc)
    this.isDropdownOpen = false;
    }

  }