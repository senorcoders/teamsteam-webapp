import { Routes } from '@angular/router';

import { UserListComponent } from './user-list/userlist.component';
import { UserTableComponent } from './user-table/usertable.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserContactComponent } from './user-contact/user-contact.component';

export const UsersRoutes: Routes = [{
  path: '',
  redirectTo: 'user-list',
  pathMatch: 'full',
},{
  path: '',
  children: [{
    path: 'userlist',
    component: UserListComponent
  }, {
    path: 'usertable',
    component: UserTableComponent
  }, {
    path: 'userprofile',
    component: UserProfileComponent
  }, {
    path: 'usercontact',
    component: UserContactComponent
  }]
}];
