import { Routes } from '@angular/router';

import { ListComponent } from './list/list.component';
import { GridsComponent } from './grids/grids.component';

export const ComponentRoutes: Routes = [{
  path: '',
  redirectTo: 'list',
  pathMatch: 'full',
},{
  path: '',
  children: [{
    path: 'list',
    component: ListComponent
  }, {
    path: 'grids',
    component: GridsComponent
  }]
}];
