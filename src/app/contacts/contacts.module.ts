import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';
import { ContactsRouter } from './contacts.routing';
import { AddContactComponent } from './google/add-contact/add-contact.component';
import { ViewContactsComponent } from './google/view-contacts/view-contacts.component';
import { UpdateContactComponent } from './google/update-contact/update-contact.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ContactsRouter),
    ToastrModule.forRoot(),
  ],
  declarations: [
    AddContactComponent,
    ViewContactsComponent,
    UpdateContactComponent
  ]
})

export class ContactsModule {}
