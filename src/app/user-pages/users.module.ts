import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { UserListComponent } from './user-list/userlist.component';
import { UserTableComponent } from './user-table/usertable.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserContactComponent } from './user-contact/user-contact.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UsersRoutes } from './users.routing';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(UsersRoutes),
    ToastrModule.forRoot(),
  ],
  declarations: [ 
    UserListComponent,
    UserTableComponent,
    UserProfileComponent,
    UserContactComponent,
    EditUserComponent,
  ]
})

export class UsersDemoModule {}
