import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { fadeInOut } from '../utils/animations';

@Component({
    selector: 'app-spinner',
    imports: [CommonModule],
    templateUrl: './spinner.component.html',
    styles: [],
    animations: [fadeInOut]
})
export class SpinnerComponent {
  @Input() show: boolean = false;
}
