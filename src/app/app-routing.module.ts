import {Routes} from '@angular/router';

import {MainComponent} from './main/main.component';
import {AuthComponent} from './auth/auth.component';
import {HorizontalLayoutComponent} from './horizontal-layout/horizontal-layout.component';
import {LoginoneComponent} from './session/loginone/loginone.component';
import {RegisterComponent} from './session/register/register.component';
import {MyGuardService} from './services/my-guard.service';
import {PlayerRoutesService} from './services/player-routes.service';
import {PaymentComponent} from './payment/payment.component';
import {SubscriptionsComponent} from './subscriptions/subscriptions.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'loginone',
    pathMatch: 'full',
  },
  {
    path: 'loginone',
    component: LoginoneComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivate: [MyGuardService],
      },
      {
        path: 'teams',
        loadChildren: './teams/teams.module#TeamModule',
        canActivate: [MyGuardService],
      },
      {
        path: 'contacts',
        loadChildren: './contacts/contacts.module#ContactsModule',
        canActivate: [MyGuardService],
      },
      {
        path: 'player',
        loadChildren: './player/player.module#PlayerModule',
        canActivate: [MyGuardService, PlayerRoutesService],
      },
      {
        path: 'tasks',
        loadChildren: './tasks/task.module#TaskModule',
        canActivate: [MyGuardService],
      },
      {
        path: 'league',
        loadChildren: './league/league.module#LeagueModule',
        canActivate: [MyGuardService],
      },
      {
        path: 'events',
        loadChildren: './events/events.module#EventsModule',
        canActivate: [MyGuardService],
      },
      {
        path: '',
        loadChildren: './user-pages/users.module#UsersDemoModule',
        canActivate: [MyGuardService],
      },
      {
        path: 'payment',
        component: PaymentComponent,
        canActivate: [MyGuardService],
      },
      {
        path: 'subscriptions',
        component: SubscriptionsComponent,
        canActivate: [MyGuardService],
      },
    ],
  },
  {
    path: 'horizontal',
    component: HorizontalLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivate: [MyGuardService],
      },
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivate: [MyGuardService],
      },
      {
        path: 'components',
        loadChildren: './components/components.module#ComponentDemoModule',
        canActivate: [MyGuardService],
      },
      {
        path: 'icons',
        loadChildren: './icons/icons.module#IconsModule',
        canActivate: [MyGuardService],
      },
      {
        path: 'ngx-toaster',
        loadChildren: './ngx-toaster/toaster.module#ToasterDemoModule',
        canActivate: [MyGuardService],
      },
      {
        path: '',
        loadChildren: './user-pages/users.module#UsersDemoModule',
        canActivate: [MyGuardService],
      },
    ],
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'session',
        loadChildren: './session/session.module#SessionDemoModule',
      },
    ],
  },
];
