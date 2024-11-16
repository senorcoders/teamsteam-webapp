import {Routes} from '@angular/router';

import {AddPlayerComponent} from './add-player/add-player.component';
import {ListPlayerComponent} from './list-player/list-player.component';
import {AddRosterComponent} from './add-roster/add-roster.component';
import {ViewPlayerComponent} from './view-player/view-player.component';

export const PlayerRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list-player',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'list-player',
        component: ListPlayerComponent,
      },
      {
        path: 'add-player',
        component: AddPlayerComponent,
      },
      {
        path: 'upload-roster',
        component: AddRosterComponent,
      },
      {
        path: 'view/:id',
        component: ViewPlayerComponent,
      },
    ],
  },
];
