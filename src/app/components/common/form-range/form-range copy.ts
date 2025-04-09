import { NgClass, NgFor } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from "@angular/forms";


export interface Room {
  value: number;
  label: string;
  checked: boolean;
}

@Component({
    selector: 'app-checkboxes',
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, NgFor, NgClass],
    template: `
<div>
<label class=" block mb-2 mt-3 text-sm font-medium text-gray-700 dark:text-white">{{title}}</label>
  <label class="relative inline-block" *ngFor="let room of rooms">
    <input name="roomList"
           [id]="'room-list-' + room.value"
           type="checkbox"
           class="w-10 h-10 mx-1 appearance-none border-2 bg-gray-50 border-gray-300 rounded-xs checked:border-blue-500 transition-colors"
           [value]="room.value"
           [(ngModel)]="room.checked"
           (change)="onCheckboxChange()">
    <span [ngClass]="{'text-blue-500': room.checked}" class="absolute inset-0 pb-1 flex items-center justify-center text-gray-700">{{ room.label }}</span>
  </label>
</div>
    `,
    styles: [`
      
    `]
})
export class CheckboxesComponent implements OnInit {


  rooms: Room[] = [
    { value: 1, label: '1', checked: false },
    { value: 2, label: '2', checked: false },
    { value: 3, label: '3', checked: false },
    { value: 4, label: '4', checked: false },
    { value: 5, label: '5+', checked: false },
   
  ];
  @Output() roomChange = new EventEmitter<number[]>();
  //@Input() rooms: Room[] = [];
  @Input() title: string = '';
  @Input() selectedRooms: number[] = [];
  constructor() { 
   
  }

  ngOnInit(): void {
    this.selectedRooms.forEach(room => {
      const index = this.rooms.findIndex(r => r.value === room);
      if (index !== -1) {
        this.rooms[index].checked = true;
      }
    })
  }

  onCheckboxChange(): void {
    this.roomChange.emit(this.rooms.filter(r => r.checked).map(room => room.value));
  }
}