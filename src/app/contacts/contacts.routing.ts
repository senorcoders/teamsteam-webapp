import { Routes } from '@angular/router';
import { AddContactComponent } from './google/add-contact/add-contact.component';
import { UpdateContactComponent } from './google/update-contact/update-contact.component';
import { ViewContactsComponent } from './google/view-contacts/view-contacts.component';


export const ContactsRouter: Routes = [{
  path: '',
  redirectTo: 'user-list',
  pathMatch: 'full',
}, {
  path: '',
  children: [{
    path: 'add',
    component: AddContactComponent
  },
  {
    path: 'edit/:resourceName',
    component: UpdateContactComponent
  },
  {
    path: 'list',
    component: ViewContactsComponent
  },
  ]
}];
