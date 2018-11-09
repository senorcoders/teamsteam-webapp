import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';
import { ContactsRouter } from './contacts.routing';
import { AddContactGoogleComponent } from './google/add-contact/add-contact.component';
import { ViewContactsComponent } from './google/view-contacts/view-contacts.component';
import { UpdateContactComponent } from './google/update-contact/update-contact.component';
import { AddContactYahooComponent } from './yahoo/add-contact/add-contact.component';
import { UpdateContactYahooComponent } from './yahoo/update-contact/update-contact.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ContactsRouter),
    ToastrModule.forRoot(),
  ],
  declarations: [
    AddContactGoogleComponent,
    AddContactYahooComponent,
    ViewContactsComponent,
    UpdateContactComponent,
    UpdateContactYahooComponent
  ]
})

export class ContactsModule {}
