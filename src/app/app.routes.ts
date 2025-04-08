import { Routes } from '@angular/router';
import { DetailsPageComponent } from './components/details-page/details-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { FilterBarComponent } from './components/filter-page/filter-bar/filter-bar.component';

export const routes: Routes = [
    {
        path: '',
        component: MainPageComponent,
        loadChildren: () => import('./components/main.module').then((m) => m.MainModule)
      },
    {path: "details/:id", component: DetailsPageComponent},
    {path: ":operation/:type", component: FilterBarComponent},
    {path: ":operation", component: FilterBarComponent},
 
];
