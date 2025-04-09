import { Component, EventEmitter, HostListener, Input, Output, SimpleChanges } from "@angular/core";
import { CosmosdbService } from "../../../services/cosmosdb.service";
import { FormsModule } from "@angular/forms";
import { NgClass } from "@angular/common";



@Component({
  selector: 'app-prompt-form',
  standalone: true,
  imports: [FormsModule, NgClass],
  template: `
<div class="relative mx-96">
    <label for="aiPromt" for="aiPromt" class="sr-only">ai prompt</label>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" aria-hidden="true" class="absolute left-3 top-1/2 size-4 -translate-y-1/2 fill-primary dark:fill-primary-dark">
        <path fill-rule="evenodd" d="M5 4a.75.75 0 0 1 .738.616l.252 1.388A1.25 1.25 0 0 0 6.996 7.01l1.388.252a.75.75 0 0 1 0 1.476l-1.388.252A1.25 1.25 0 0 0 5.99 9.996l-.252 1.388a.75.75 0 0 1-1.476 0L4.01 9.996A1.25 1.25 0 0 0 3.004 8.99l-1.388-.252a.75.75 0 0 1 0-1.476l1.388-.252A1.25 1.25 0 0 0 4.01 6.004l.252-1.388A.75.75 0 0 1 5 4ZM12 1a.75.75 0 0 1 .721.544l.195.682c.118.415.443.74.858.858l.682.195a.75.75 0 0 1 0 1.442l-.682.195a1.25 1.25 0 0 0-.858.858l-.195.682a.75.75 0 0 1-1.442 0l-.195-.682a1.25 1.25 0 0 0-.858-.858l-.682-.195a.75.75 0 0 1 0-1.442l.682-.195a1.25 1.25 0 0 0 .858-.858l.195-.682A.75.75 0 0 1 12 1ZM10 11a.75.75 0 0 1 .728.568.968.968 0 0 0 .704.704.75.75 0 0 1 0 1.456.968.968 0 0 0-.704.704.75.75 0 0 1-1.456 0 .968.968 0 0 0-.704-.704.75.75 0 0 1 0-1.456.968.968 0 0 0 .704-.704A.75.75 0 0 1 10 11Z" clip-rule="evenodd" />
    </svg>

<input 
                                    
    [(ngModel)]="prompt"
    class="w-full border border-outline bg-surface-alt rounded-xs px-2 py-4 pl-10 pr-24 text-sm text-on-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-75 dark:border-outline-dark dark:bg-surface-dark-alt/50 dark:text-on-surface-dark dark:focus-visible:outline-primary-dark" 
    name="prompt" 
    placeholder="Ask AI ..." 
    autocomplete="off" 
    spellcheck="false" 
    required 
    step="any" 
    autocapitalize="none" 
    autofocus />
<button 
    type="buttom" 
    (click)="executePrmpt.emit(prompt)"
    class="absolute right-3 top-1/2 -translate-y-1/2 bg-primary rounded-md px-3 py-2 text-xs tracking-wide text-gray-100 transition hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary active:opacity-100 active:outline-offset-0 bg-blue-800 dark:focus-visible:outline-primary-dark">
    @if(loading){
      <div style="width: 18px; height: 18px;">
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
    <radialGradient id='a6' cx='.66' fx='.66' cy='.3125' fy='.3125' gradientTransform='scale(1.5)'>
      <stop offset='0' stop-color='#F5FCFF'></stop>
      <stop offset='.3' stop-color='#F5FCFF' stop-opacity='.9'></stop>
      <stop offset='.6' stop-color='#F5FCFF' stop-opacity='.6'></stop>
      <stop offset='.8' stop-color='#F5FCFF' stop-opacity='.3'></stop>
      <stop offset='1' stop-color='#F5FCFF' stop-opacity='0'></stop>
    </radialGradient>
    <circle transform-origin='center' fill='none' stroke='url(#a6)' stroke-width='15' stroke-linecap='round' stroke-dasharray='200 1000' stroke-dashoffset='0' cx='100' cy='100' r='70'>
      <animateTransform type='rotate' attributeName='transform' calcMode='spline' dur='2' values='360;0' keyTimes='0;1' keySplines='0 0 1 1' repeatCount='indefinite'></animateTransform>
    </circle>
    <circle transform-origin='center' fill='none' opacity='.2' stroke='#F5FCFF' stroke-width='15' stroke-linecap='round' cx='100' cy='100' r='70'></circle>
  </svg>
</div>
      
    }
    @else{
      <div>
        Go
      </div>

    }
</button>
</div>
    `,
  styles: [`    
    `]
})
export class PromptComponent {

  isDropdownOpen = false;
  barrios = []
  prompt = ""

  constructor(private cosmosService: CosmosdbService) { }
  @Output() executePrmpt = new EventEmitter<string>()
  @Input() placeholder: string = "Search"
  @Input() loading: boolean = false 

  @HostListener("document:click", ["$event"])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickInside = target.closest(".relative");

  }


}