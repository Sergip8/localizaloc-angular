import { Component, EventEmitter, Input, Output, SimpleChanges } from "@angular/core";
import { NgFor } from "@angular/common";
import { MapComponent } from "../shared/map/map.component";


@Component({
    selector: 'app-card-main',
    imports: [NgFor, MapComponent],
    template: `
           <div class="">
                      <button class=" bg-white p-1 opacity-80 rounded-sm  h-30 w-30 absolute z-[9999] ms-6 mt-4 right-9" (click)="onMap()">
                        @if (!showMap) {
                          <svg class="" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.7 15C4.03377 15.6353 3 16.5205 3 17.4997C3 19.4329 7.02944 21 12 21C16.9706 21 21 19.4329 21 17.4997C21 16.5205 19.9662 15.6353 18.3 15M12 9H12.01M18 9C18 13.0637 13.5 15 12 18C10.5 15 6 13.0637 6 9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9ZM13 9C13 9.55228 12.5523 10 12 10C11.4477 10 11 9.55228 11 9C11 8.44772 11.4477 8 12 8C12.5523 8 13 8.44772 13 9Z" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
             
                        }@else {
                         <svg  width="25px" height="25px" viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M320 89.6h640v76.8H320V89.6z m0 768h640v76.8H320v-76.8z m-256-768h128v76.8H64V89.6z m256 384h640v76.8H320V473.6z m-256 0h128v76.8H64V473.6z m0 384h128v76.8H64v-76.8z" fill="#000000" /></svg>
                        }   
                   </button>
                      @if (showMap) {
                        <div class="">
                          <app-map [localData]="suggested"></app-map>
                        </div>
                      }  @else {
                    <div class="absolute w-[5px] h-[25px] bg-orange rounded-xl left-0 bottom-0 opacity-0 group-hover:opacity-100 group-hover:bottom-[75%]  duration-[500ms]"></div>
                     <img [src]="suggested.image" class="w-[60%] h-auto rounded-xl" alt="">
                      <h4 class="line-clamp-1 font-semibold">{{suggested.title}}</h4>
                      <p class="line-clamp-4 text-[12px] md:text-[16px] md:mt-[15px] mt-[15px]  w-full text-transtext mb-[15px]">{{suggested.description}}</p>
                      <div class="flex gap-3 p-2">
                        <span>
                          <div>
                            Cuartos
                          </div>
                          <div class="font-bold">
                            {{suggested.technicalSheet.bedrooms || 1}}
                          </div>
                        </span>
                        <span>
                          <div>
                            Baños
                          </div>
                          <div class="font-bold">
                            {{suggested.technicalSheet.bathrooms}}
                          </div>
                        </span>
                        <span>
                          <div>
                            Area
                          </div>
                          <div class="font-bold">
                            {{suggested.area}} m<sup>2</sup>
                          </div>
                        </span>
                      </div>
                      <div class=" mt-5 w-full md:w-[70%] h-[15px] flex pl-[10px] items-center relative ">
                       <a class=" bottom-0 flex items-center justify-center rounded-md bg-blue-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" [href]="suggested.link">
                        <div>
                          Ir a {{suggested.from}}
                        </div>
                        <div>
                          <svg class="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                          </svg>
                        </div>
                       </a>
                      </div>
                    }
                   </div> 
    `,
    styles: [`
        
    `]
})
  export class CardMainComponent {

    
    @Input() suggested!: any
    @Output() selected = new EventEmitter<string>()
showMap = false;
onMap() {
    this.showMap = !this.showMap 
  }
  }