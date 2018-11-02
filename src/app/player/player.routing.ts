import { Routes } from '@angular/router';

import { AddPlayerComponent } from './add-player/add-player.component';
import { ListPlayerComponent } from './list-player/list-player.component'
import { AddRosterComponent } from './add-roster/add-roster.component';
import { ViewPlayerComponent } from './view-player/view-player.component';
import { ViewContactsPlayerComponent } from './view-contacts/view-contacts.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { UpdateContactComponent } from './update-contact/update-contact.component';

export const PlayerRoutes: Routes = [{
  path: '',
  redirectTo: 'listplayer',
  pathMatch: 'full',
}, {
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
  },
  {
    path: "view/:id",
    component: ViewPlayerComponent
  },
  {
    path: "view/contacts/:id/:team",
    component: ViewContactsPlayerComponent
  },
  {
    path: "contact/add/:id",
    component: AddContactComponent
  },
  {
    path: "contact/update/:id/:resource",
    component: UpdateContactComponent
  }
  ]
}];
