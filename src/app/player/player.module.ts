import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import {PlayerRoutes } from './player.routing';
import {AddPlayerComponent} from './add-player/add-player.component';
import {ListPlayerComponent} from './list-player/list-player.component'
import { AddRosterComponent } from './add-roster/add-roster.component';
import { ViewPlayerComponent } from './view-player/view-player.component';
import { ViewContactsPlayerComponent } from './view-contacts/view-contacts.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { UpdateContactComponent } from './update-contact/update-contact.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule.forChild(PlayerRoutes),
  ],
  declarations: [ 
    AddPlayerComponent,
    ListPlayerComponent,
    AddRosterComponent,
    ViewPlayerComponent,
    ViewContactsPlayerComponent,
    AddContactComponent,
    UpdateContactComponent
  ]
})

export class PlayerModule {}
