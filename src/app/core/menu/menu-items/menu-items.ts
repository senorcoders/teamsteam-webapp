import { Injectable } from '@angular/core';

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  children?: ChildrenItems[];
}

const MENUITEMS = [
  // {
  //   state: 'form-builder',
  //   name: 'Form Builder',
  //   type: 'sub',
  //   icon: 'fa fa-book',
  //   children: [
  //     {state: 'add', name: 'Add New'},
  //     {state: 'list', name: 'List Form'},
  //   ]
  // },
  {
    state: 'teams',
    name: 'Teams',
    type: 'sub',
    icon: 'icon-speedometer icons',
    children: [
      { state: 'list-team', name: 'List' },
    ]
  },
  {
    state: 'events',
    name: 'Events',
    type: 'sub',
    icon: 'icon-people icons',
    children: [
      { state: 'list', name: 'View Events' },
      { state: 'add', name: 'Create New Event' },
    ]
  },
  {
    state: 'player',
    name: 'Players',
    type: 'sub',
    icon: 'icon-people icons',
    children: [
      { state: 'upload-roster', name: 'Upload Roster' },
      { state: 'add-player', name: 'Add Player' },
      { state: 'list-player', name: 'List Player' },
    ]
  },
  {
    state: 'tasks',
    name: 'My Tasks',
    type: 'sub',
    icon: 'fa fa-tasks',
    children: [
      { state: 'add', name: 'Add task' },
      { state: 'list', name: 'List task' }
    ]
  },
  {
    state: "league",
    name: "Leagues",
    type: "sub",
    icon: "fa fa-list-alt",
    children: [
      { state: "list", name: "List League" },
      { state: "add", name: "Create League" },
      { state: "upload", name: "Upload League" }
    ]
  }

];
const SUPERMENUITEMS = [
  {
    state: 'dashboard-v1',
    name: 'Dashboard',
    icon: 'fa fa-tachometer',
    type: 'link'
  },
  {
    state: 'userlist',
    name: 'Users',
    icon: 'fa fa-user',
    type: 'link'
  },
  {
    state: 'payment',
    name: 'Payment',
    icon: 'fa fa-credit-card',
    type: 'link'
  },
  {
    state: 'subscriptions',
    name: 'Subscriptions',
    icon: 'fa fa-id-card',
    type: 'link'
  }

];
@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
  getSuperUser(): Menu[] {
    return SUPERMENUITEMS;
  }
}
