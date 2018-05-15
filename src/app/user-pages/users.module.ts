import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserListComponent } from './user-list/userlist.component';
import { UserTableComponent } from './user-table/usertable.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserContactComponent } from './user-contact/user-contact.component';
import { UsersRoutes } from './users.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(UsersRoutes)
  ],
  declarations: [ 
    UserListComponent,
    UserTableComponent,
    UserProfileComponent,
    UserContactComponent,
  ]
})

export class UsersDemoModule {}
