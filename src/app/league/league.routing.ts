import {Routes} from '@angular/router';

import {ListLeagueComponent} from './list-league/list-league.component';
import {AddLeagueComponent} from './add-league/add-league.component';
import {UploadLeagueComponent} from './upload-league/upload-league.component';

export const LeagueRoutes: Routes = [{
  path: '',
  redirectTo: 'list',
  pathMatch: 'full',
}, {
  path: '',
  children: [
    {
      path: 'list',
      component: ListLeagueComponent
    },
    {
      path: 'add',
      component: AddLeagueComponent
    },
    {
      path: 'upload',
      component: UploadLeagueComponent
    }
  ]
}
];
