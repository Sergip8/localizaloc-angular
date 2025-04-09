import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { SelectData } from "./selectModel";
import { NgClass } from "@angular/common";

@Component({
    selector: "app-selectcheck",
    imports: [NgClass],
    template: `
    <div [class]="'relative  '+data.default.replaceAll(' ', '') ">
      @if (data.showLabel) {
        <label class=" block mb-2 mt-3 text-sm font-medium text-gray-700 dark:text-white">{{data?.default}}</label>

      }
      <button
        class="w-full justify-between font-normal text-gray-400 text-sm  dark:text-white bg-white ps-4 pe-1 py-2 inline-flex items-center"
        (click)="toggleDropdown()"
      >
      @if (data.type == "multiple") {
        {{selectedList.length >0 ? selectedList.join(","): data.default }}
      }
      @if (data.type == "single") {
        {{selectedItem != "" ? selectedItem : data.default }}
      }
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="3"
          stroke="currentColor"
          class="w-3 h-4 ml-3"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      <div
        [ngClass]="{
          'transition ease-out duration-300 transform opacity-100 scale-100': isDropdownOpen,
          'transition ease-in duration-75 transform opacity-0 scale-0': !isDropdownOpen
        }"
        class="absolute mt-1 w-48 bg-white shadow-lg z-10"
      >
      <div>
        @if (data.search) {
          <input (input)="search($event)" type="text" class="w-full px-2 pb-1 left-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />

        }
      </div>
        @for (opt of data.list; track $index) {
        <div (click)="itemSelected(opt)" class="flex items-center px-2  hover:bg-amber-500">
          @if (data.type == "multiple") {
            <input
              type="checkbox"
              [checked]="isChecked(opt)"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              id="check"
            />

          }
          <div class="cursor-pointer block px-4 py-2 dark:text-gray-100 mr-4">{{ opt }}</div>
        </div>

        }
      </div>
    </div>
  `,
    styles: [``]
})
export class SelectCheckComponent implements OnInit {
isChecked(opt: string|number) {
  return this.selectedList.includes(opt)
}
  ngOnInit(): void {
    this.originalData = this.data.list
    console.log(this.setValue)
    if(this.setValue){
      if(Object.prototype.toString.call(this.setValue) === '[object Array]') 
        this.selectedList = this.setValue.map(_ => _[0].toUpperCase() + _.slice(1).toLowerCase())
      else
        this.selectedItem = this.setValue[0].toUpperCase() + this.setValue.slice(1).toLowerCase()
    }
  }
search(search: Event) {
  this.data.list = this.originalData
  const res = []
  const inputElement = search.target as HTMLInputElement;
  console.log(inputElement.value);
  this.data.list.forEach(_ =>{
    if(_.toLowerCase().startsWith(inputElement.value.toLowerCase())){
      res.push(_)
    }
  })
  this.data.list = res
}
  selectedItem: any = ""
  selectedList: any[] = []

itemSelected(selected: any) {
  if (this.data.type == "multiple"){
    const index = this.selectedList.indexOf(selected)
    if (index == -1)
      this.selectedList.push(selected)
    else
      this.selectedList.splice(index, 1) 
  this.selectedMulti.emit(this.selectedList)
  }
  if (this.data.type == "single"){
    this.selectedItem = selected
    this.isDropdownOpen = false;
    this.selectedSingle.emit(this.selectedItem)
  }

}
  originalData = []
  isDropdownOpen = false;
  @Input() data!: SelectData;
  @Output() selectedSingle = new EventEmitter<any>()
  @Output() selectedMulti = new EventEmitter<any[]>()
  @Input() setValue:any
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  @HostListener("document:click", ["$event"])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickInside = target.closest(`.${this.data?.default.replaceAll(' ', '')}`);
    
    if (!clickInside) {
      this.isDropdownOpen = false;
    }
  }
}
