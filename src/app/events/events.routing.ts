import { Routes } from '@angular/router';
import { AddEventComponent } from './add/add-event.component';
import { ListEventComponent } from './list/list-event.component';
import { EditEventComponent } from './edit/edit-event.component';


export const EventsRoutes: Routes = [{
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
}, {
    path: '',
    children: [{
        path: "list",
        component: ListEventComponent
    },
    {
        path: 'add',
        component: AddEventComponent
    },
    {
        path: "edit/:id",
        component: EditEventComponent
    }
    ]
}];
