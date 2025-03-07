import { Component } from '@angular/core';
import { FilterBarComponent } from './filter-bar/filter-bar.component';

@Component({
  selector: 'app-filter-page',
  standalone: true,
  imports: [FilterBarComponent],
  templateUrl: './filter-page.component.html',
  styleUrl: './filter-page.component.css'
})
export class FilterPageComponent {

}
