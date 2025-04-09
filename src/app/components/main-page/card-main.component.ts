import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgFor } from "@angular/common";
import { MapComponent } from "../shared/map/map.component";

@Component({
    selector: 'app-card-main',
    imports: [NgFor, MapComponent],
    template: `
        <div class="relative h-full flex flex-col bg-white rounded-xl overflow-hidden">
            <!-- Map Toggle Button -->
            <button class="absolute top-4 right-4 z-20 bg-white p-2 rounded-lg shadow-md hover:shadow-lg focus:outline-none" (click)="onMap()" aria-label="Toggle Map View">
                @if (!showMap) {
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.7 15C4.03377 15.6353 3 16.5205 3 17.4997C3 19.4329 7.02944 21 12 21C16.9706 21 21 19.4329 21 17.4997C21 16.5205 19.9662 15.6353 18.3 15M12 9H12.01M18 9C18 13.0637 13.5 15 12 18C10.5 15 6 13.0637 6 9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9ZM13 9C13 9.55228 12.5523 10 12 10C11.4477 10 11 9.55228 11 9C11 8.44772 11.4477 8 12 8C12.5523 8 13 8.44772 13 9Z" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                } @else {
                    <svg width="20" height="20" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M320 89.6h640v76.8H320V89.6z m0 768h640v76.8H320v-76.8z m-256-768h128v76.8H64V89.6z m256 384h640v76.8H320V473.6z m-256 0h128v76.8H64V473.6z m0 384h128v76.8H64v-76.8z" />
                    </svg>
                }
            </button>
            
            @if (showMap) {
                <div class="w-full h-full min-h-[300px]">
                    <app-map [localData]="suggested"></app-map>
                </div>
            } @else {
                <div class="flex flex-col h-full">
                    <!-- Left Accent Border -->
                    <div class="absolute w-1 h-0 bg-orange rounded-full left-0 bottom-0 opacity-0 group-hover:opacity-100 group-hover:h-20 transition-all duration-500"></div>
                    
                    <div class="p-4">
                        <!-- Property Image -->
                        <div class="overflow-hidden rounded-lg mb-4">
                            <img [src]="suggested.image" class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" alt="{{suggested.title}}">
                        </div>
                        
                        <!-- Property Title -->
                        <h4 class="text-lg font-semibold mb-2 line-clamp-1">{{suggested.title}}</h4>
                        
                        <!-- Property Description -->
                        <p class="text-sm md:text-base text-gray-600 mb-4 line-clamp-3">{{suggested.description}}</p>
                        
                        <!-- Property Specs -->
                        <div class="flex justify-between bg-gray-50 rounded-lg p-3 mb-4">
                            <div class="text-center">
                                <div class="text-xs text-gray-500">Cuartos</div>
                                <div class="font-bold">{{suggested.technicalSheet.bedrooms || 1}}</div>
                            </div>
                            <div class="text-center">
                                <div class="text-xs text-gray-500">Baños</div>
                                <div class="font-bold">{{suggested.technicalSheet.bathrooms}}</div>
                            </div>
                            <div class="text-center">
                                <div class="text-xs text-gray-500">Area</div>
                                <div class="font-bold">{{suggested.area}} m<sup>2</sup></div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- CTA Button - Using mt-auto to push it to bottom -->
                    <div class="mt-auto p-4 pt-0">
                        <a class="flex items-center justify-center w-full rounded-lg bg-blue-600 py-3 px-4 text-center text-sm font-medium text-white transition-all duration-300 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" [href]="suggested.link">
                            <span>Ir a {{suggested.from}}</span>
                            <svg class="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                    </div>
                </div>
            }
        </div>
    `,
    styles: [`
        :host {
            display: block;
            height: 100%;
        }
    `]
})
export class CardMainComponent {
    @Input() suggested!: any;
    @Output() selected = new EventEmitter<string>();
    showMap = false;
    
    onMap() {
        this.showMap = !this.showMap;
    }
}