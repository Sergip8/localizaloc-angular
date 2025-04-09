import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";



@Component({
    selector: 'app-form-range',
    imports: [ReactiveFormsModule],
    template: `
     <form class="max-w-sm mx-auto w-full" [formGroup]="formGroup" (submit)="submit()">
        <label for="min" class="text-sm font-medium text-gray-700 dark:text-white">{{labelStr}}</label>
        <div class="flex items-center justify-center">
          <div class="">
            <input placeholder="Desde" inputmode="numeric" type="number" formControlName="min" class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          </div>
          <div class="my-1 bg-cyan-900 h-[1px] w-2">
          </div>
          <div class="">
            <input placeholder="Hasta" inputmode="numeric" type="number" formControlName="max"  class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
          <button type="submit" [disabled]="formGroup.invalid" class="  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 ms-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="3"
          stroke="currentColor"
          class="w-3 h-4 rotate-[270deg]"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
          </button>
          
        </div>
        
      </form>
    `,
    styles: [`
        input[number]{
    appearance: text;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
*:focus {
    outline: none;
}
    `]
})
  export class FormRangeComponent implements OnInit {
submit() {
    this.range.emit(this.formGroup.value)
}

    formGroup: FormGroup 
    constructor(private formBuilder: FormBuilder){
        this.formGroup = this.formBuilder.group({
            min: [null, [Validators.required, Validators.pattern("[0-9]+")]],
            max: [null, [Validators.required, Validators.pattern("[0-9]+")]],
          });
    }
  ngOnInit(): void {
    if (this.rangeValues){
      this.formGroup.patchValue({
        min: this.rangeValues[0],
        max: this.rangeValues[1]
      })
    }

  }
    
    @Output() range = new EventEmitter<any>()
    @Input() labelStr: string
    @Input() rangeValues: number[] = null

  }