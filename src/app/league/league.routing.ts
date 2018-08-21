import { Routes } from '@angular/router';

import { ListLeagueComponent } from './list-league/list-league.component';
import { AddLeagueComponent } from './add-league/add-league.component';

export const LeagueRoutes: Routes = [{
    path: '',
    redirectTo: 'list-league',
    pathMatch: 'full',
}, {
    path: '',
    children: [{
        path: 'list',
        component: ListLeagueComponent
    },
    {
        path:"add",
        component: AddLeagueComponent
    }
    ]
}];
