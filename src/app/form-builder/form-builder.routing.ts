import { Routes } from '@angular/router';

import {AddFormBuilderComponent} from './add-form-builder/add-form-builder.component';
import {ListFormBuilderComponent} from './list-form-builder/list-form-builder.component'

export const FormBuilderRoutes: Routes = [{
  path: '',
  redirectTo: 'listform',
  pathMatch: 'full',
},{
  path: '',
  children: [{
    path: 'list',
    component: ListFormBuilderComponent
  }, {
    path: 'add',
    component: AddFormBuilderComponent
  }
   ]
}];
