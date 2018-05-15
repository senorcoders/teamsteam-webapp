import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { MainComponent }   from './main/main.component';
import { AuthComponent }   from './auth/auth.component';
import { HorizontalLayoutComponent } from './horizontal-layout/horizontal-layout.component';
import { LoginoneComponent } from './session/loginone/loginone.component';
import {MyGuardService} from './services/my-guard.service';
export const AppRoutes: Routes = [{
  path: '',
  redirectTo: 'loginone',
  pathMatch: 'full',
},
{
    path:'loginone', component:LoginoneComponent
},
{
  path: '',
  component: MainComponent,
  children: [{
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canActivate:[MyGuardService]
  },{
    path: 'inbox',
    loadChildren: './inbox/inbox.module#InboxModule',
    canActivate:[MyGuardService]
  }
  ,{
    path: 'chat',
    loadChildren: './chat/chat.module#ChatModule',
    canActivate:[MyGuardService]
  },{
    path: 'calendar',
    loadChildren: './calendar/calendar.module#CalendarDemoModule',
    canActivate:[MyGuardService]
  },{
    path: 'ui-elements',
    loadChildren: './ui-elements/ui-elements.module#UiElementsModule',
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
    path: 'forms',
    loadChildren: './forms/forms.module#FormsDemoModule',
    canActivate:[MyGuardService]
  },{
    path: 'tables',
    loadChildren: './tables/tables.module#TablesDemoModule',
    canActivate:[MyGuardService]
  },{
    path: 'editor',
    loadChildren: './editor/editor.module#EditorModule',
    canActivate:[MyGuardService]
  },{
    path: 'chart',
    loadChildren: './chart/charts.module#ChartDemoModule',
    canActivate:[MyGuardService]
  },{
    path: 'dragndrop',
    loadChildren: './drag-and-drop/dragndrop.module#DragDropDemoModule',
    canActivate:[MyGuardService]
  },{
    path: 'resizable',
    loadChildren: './resizable/resizable.module#ResizableDemoModule',
    canActivate:[MyGuardService]
  },{
    path: 'ngx-toaster',
    loadChildren: './ngx-toaster/toaster.module#ToasterDemoModule',
    canActivate:[MyGuardService]
  },{
    path: 'file-manager',
    loadChildren: './file-manager/file-manager.module#FileManagerModule',
    canActivate:[MyGuardService]
  },{
    path: 'animation',
    loadChildren: './animation/animation.module#AnimationDemoModule',
    canActivate:[MyGuardService]
  },{
    path: 'maps',
    loadChildren: './maps/maps.module#MapsDemoModule',
    canActivate:[MyGuardService]
  },{
    path: 'user-pages',
    loadChildren: './user-pages/users.module#UsersDemoModule',
    canActivate:[MyGuardService]
  },{
    path: 'pages',
    loadChildren: './custom-pages/pages.module#PagesDemoModule',
    canActivate:[MyGuardService]
  },{
    path: 'blog',
    loadChildren: './blog/blogs.module#BlogsDemoModule',
    canActivate:[MyGuardService]
  },{
    path: 'gallery',
    loadChildren: './gallery/gallery.module#GalleryDemoModule',
    canActivate:[MyGuardService]
  },{
    path: 'ecommerce',
    loadChildren: './ecommerce/ecommerce.module#EcommerceDemoModule',
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
    path: 'inbox',
    loadChildren: './inbox/inbox.module#InboxModule',
    canActivate:[MyGuardService]
  },{
    path: 'chat',
    loadChildren: './chat/chat.module#ChatModule',
    canActivate:[MyGuardService]
  },{
    path: 'calendar',
    loadChildren: './calendar/calendar.module#CalendarDemoModule',
    canActivate:[MyGuardService]
  },{
    path: 'ui-elements',
    loadChildren: './ui-elements/ui-elements.module#UiElementsModule',
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
    path: 'forms',
    loadChildren: './forms/forms.module#FormsDemoModule',
    canActivate:[MyGuardService]
  },{
    path: 'tables',
    loadChildren: './tables/tables.module#TablesDemoModule',
    canActivate:[MyGuardService]
  },{
    path: 'editor',
    loadChildren: './editor/editor.module#EditorModule',
    canActivate:[MyGuardService]
  },{
    path: 'chart',
    loadChildren: './chart/charts.module#ChartDemoModule',
    canActivate:[MyGuardService]
  },{
    path: 'dragndrop',
    loadChildren: './drag-and-drop/dragndrop.module#DragDropDemoModule',
    canActivate:[MyGuardService]
  },{
    path: 'resizable',
    loadChildren: './resizable/resizable.module#ResizableDemoModule',
    canActivate:[MyGuardService]
  },{
    path: 'ngx-toaster',
    loadChildren: './ngx-toaster/toaster.module#ToasterDemoModule',
    canActivate:[MyGuardService]
  },{
    path: 'animation',
    loadChildren: './animation/animation.module#AnimationDemoModule',
    canActivate:[MyGuardService]
  },{
    path: 'maps',
    loadChildren: './maps/maps.module#MapsDemoModule',
    canActivate:[MyGuardService]
  },{
    path: 'user-pages',
    loadChildren: './user-pages/users.module#UsersDemoModule',
    canActivate:[MyGuardService]
  },{
    path: 'pages',
    loadChildren: './custom-pages/pages.module#PagesDemoModule',
    canActivate:[MyGuardService]
  },{
    path: 'blog',
    loadChildren: './blog/blogs.module#BlogsDemoModule',
    canActivate:[MyGuardService]
  },{
    path: 'gallery',
    loadChildren: './gallery/gallery.module#GalleryDemoModule',
    canActivate:[MyGuardService]
  },{
    path: 'ecommerce',
    loadChildren: './ecommerce/ecommerce.module#EcommerceDemoModule',
    canActivate:[MyGuardService]
  }],
},
{
  path: '',
  component: AuthComponent,
  children: [{
    path: 'session',
    loadChildren: './session/session.module#SessionDemoModule'
  }]
}];

