import { Routes } from '@angular/router';
import { AddContactGoogleComponent } from './google/add-contact/add-contact.component';
import { UpdateContactComponent } from './google/update-contact/update-contact.component';
import { ViewContactsComponent } from './google/view-contacts/view-contacts.component';
import { AddContactYahooComponent } from './yahoo/add-contact/add-contact.component';
import { UpdateContactYahooComponent } from './yahoo/update-contact/update-contact.component';


export const ContactsRouter: Routes = [{
  path: '',
  redirectTo: 'user-list',
  pathMatch: 'full',
}, {
  path: '',
  children: [{
    path: 'add/google',
    component: AddContactGoogleComponent
  },
  {
    path: 'add/yahoo',
    component: AddContactYahooComponent
  },
  {
    path: 'edit/:resourceName',
    component: UpdateContactComponent
  },
  {
    path: "edit/yahoo/contact",
    component: UpdateContactYahooComponent
  },
  {
    path: 'list',
    component: ViewContactsComponent
  },
  ]
}];
