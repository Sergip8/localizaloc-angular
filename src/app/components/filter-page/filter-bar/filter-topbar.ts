import { Component, EventEmitter, Input, Output, SimpleChanges } from "@angular/core";
import { SelectData } from "../../common/select/selectModel";
import { SelectCheckComponent } from "../../common/select/select-check";



@Component({
    selector: 'app-filter-topbar',
    template: `
    
    <nav class="w-full flex items-center justify-between flex-wrap bg-slate-100 px-6 py-4">
  <div>
  </div>
    <div>
    <app-selectcheck [data]="orderData" (selectedSingle)="orderSelected($event)"/>
    </div>
  
</nav>           
    `,
    styles: [`
        
    `],
    imports: [SelectCheckComponent]
})
  export class FilterTopbarComponent {
orderSelected(order: any) {
  switch(order){
    case "Mayor precio":
      this.order.emit({"costs.total_amount": -1})
      break
    case "Menor precio":
      this.order.emit({"costs.total_amount": 1})
      break
    case "Mayor area":
      this.order.emit({"area": -1})
      break
    case "Menor area":
      this.order.emit({"area": 1})
      break
    case "Area precio":
      this.order.emit({"area_price_rent": 1})
      break
  }
}
  orderData: SelectData = {
      default: "ordenar por",
      type: "single",
      search: false,
      showLabel: false,
      list: ["Mayor precio", "Menor precio", "Mayor area", "Menor area", "Area precio"],
    };
  @Output() order = new EventEmitter<any>()
  }