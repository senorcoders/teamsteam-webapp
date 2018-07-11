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
  {
    state: 'form-builder',
    name: 'Form Builder',
    type: 'sub',
    icon: 'fa fa-book',
    children: [
      {state: 'add', name: 'Add New'},
      {state: 'list', name: 'List Form'},
    ]
  },
  {
    state: 'teams',
    name: 'Teams',
    type: 'sub',
    icon: 'icon-speedometer icons',
    children: [
      {state: 'list-team', name: 'List'},
    ]
  },
    {
    state: 'player',
    name: 'Players',
    type: 'sub',
    icon: 'icon-people icons',
    children: [
      {state: 'add-player', name: 'Add Player'},
      {state: 'list-player', name: 'List Player'},
    ]
  },
  {
    state: '',
    name: '',
    type: '',
    icon: ''
  },
    

];
/*menu for players*/
const MENUPLAYER = [
  {
    state: 'horizontal',
    name: 'HORIZONTAL LAYOUT',
    type: 'link',
    icon: 'icon-calendar icons'
  },
  {
    state: 'dashboard',
    name: 'DASHBOARD',
    type: 'sub',
    icon: 'icon-speedometer icons',
    children: [
      {state: 'dashboard-v1', name: 'DASHBOARD 1'},
      {state: 'dashboard-v2', name: 'DASHBOARD 2'},
    ]
  },
  {
    state: 'teams',
    name: 'TEAMS',
    type: 'sub',
    icon: 'icon-speedometer icons',
    children: [
      {state: 'list-team', name: 'List'},
    ]
  }

];
@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
  /*getPlayerMenu():Menu[]{
    return MENUPLAYER;
  }*/
  getTeamsMenu():Menu[]{
    return MENUPLAYER;
  }
  add(menu: Menu) {
    //MENUITEMS.push(menu);
  }
}
