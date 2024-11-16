import {Routes} from '@angular/router';

import {AddTaskComponent} from './add-task/add-task.component';
import {ListTaskComponent} from './list-task/list-task.component';

export const TaskRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'list',
        component: ListTaskComponent,
      },
      {
        path: 'add',
        component: AddTaskComponent,
      },
    ],
  },
];
