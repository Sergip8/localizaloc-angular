import { Component, EventEmitter, Input, Output, SimpleChanges } from "@angular/core";
import { SelectData } from "./selectModel";


@Component({
    
    selector: 'app-select',
    standalone: true,
    template: `
    <div class=" w-max ">
                  
        <select #select (change)="selected.emit(select.value)" id="select" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option selected hidden>{{data.default}}</option>
        @for (opt of data.list; track $index) {
          
            <option>{{opt}}</option>
        }
        </select>
    </div>
    `,
    styles: [`
        
    `],

  })
  export class SelectComponent {

    @Input() data!: SelectData
    @Output() selected = new EventEmitter<string>()

  }