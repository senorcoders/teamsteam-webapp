import { Routes } from '@angular/router';

import {AddTeamComponent} from './add-team/add-team.component';
import {ListTeamComponent} from './list-team/list-team.component'

export const TeamsRoutes: Routes = [{
  path: '',
  redirectTo: 'listteam',
  pathMatch: 'full',
},{
  path: '',
  children: [{
    path: 'list-team',
    component: ListTeamComponent
  }, {
    path: 'add-team',
    component: AddTeamComponent
  }
   ]
}];
