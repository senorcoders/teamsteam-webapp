import { Routes } from '@angular/router';

import {AddPlayerComponent} from './add-player/add-player.component';
import {ListPlayerComponent} from './list-player/list-player.component'
import { AddRosterComponent } from './add-roster/add-roster.component';

export const PlayerRoutes: Routes = [{
  path: '',
  redirectTo: 'listplayer',
  pathMatch: 'full',
},{
  path: '',
  children: [{
    path: 'list-player',
    component: ListPlayerComponent
  }, {
    path: 'add-player',
    component: AddPlayerComponent
  }, {
    path: 'upload-roster',
    component: AddRosterComponent
  }
   ]
}];
