import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { MainComponent }   from './main/main.component';
import { AuthComponent }   from './auth/auth.component';
import { HorizontalLayoutComponent } from './horizontal-layout/horizontal-layout.component';
import { LoginoneComponent } from './session/loginone/loginone.component';
import { RegisterComponent } from './session/register/register.component';
import {MyGuardService} from './services/my-guard.service';
import {PlayerRoutesService} from './services/player-routes.service';
import {TeamRoutesService} from './services/team-routes.service';
export const AppRoutes: Routes = [{
  path: '',
  redirectTo: 'loginone',
  pathMatch: 'full',
},
{
    path:'loginone', component:LoginoneComponent
},
{
    path:'register', component:RegisterComponent
},
{
  path: '',
  component: MainComponent,
  children: [{
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canActivate:[MyGuardService]
  },
  {
    path: 'teams',
    loadChildren: './teams/teams.module#TeamModule',
    canActivate:[MyGuardService]
  },
  {
    path: 'form-builder',
    loadChildren: './form-builder/form-builder.module#FormBuilderModule',
    canActivate:[MyGuardService]
  },
  {
    path: 'tasks',
    loadChildren: './tasks/task.module#TaskModule',
    canActivate:[MyGuardService]
  },
  {
    path: 'player',
    loadChildren: './player/player.module#PlayerModule',
    canActivate:[MyGuardService, PlayerRoutesService]
  },
  {
    path: '',
    loadChildren: './user-pages/users.module#UsersDemoModule',
    canActivate:[MyGuardService]
  }],
},
{
  path: 'horizontal',
  component: HorizontalLayoutComponent,
    children: [{
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canActivate:[MyGuardService]
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canActivate:[MyGuardService]
  },{
    path: 'components',
    loadChildren: './components/components.module#ComponentDemoModule',
    canActivate:[MyGuardService]
  },{
    path: 'icons',
    loadChildren: './icons/icons.module#IconsModule',
    canActivate:[MyGuardService]
  },{
    path: 'ngx-toaster',
    loadChildren: './ngx-toaster/toaster.module#ToasterDemoModule',
    canActivate:[MyGuardService]
  },{
    path: '',
    loadChildren: './user-pages/users.module#UsersDemoModule',
    canActivate:[MyGuardService]
  }
  ],
},
{
  path: '',
  component: AuthComponent,
  children: [{
    path: 'session',
    loadChildren: './session/session.module#SessionDemoModule'
  }]
}];

