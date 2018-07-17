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
    state: 'tasks',
    name: 'My Tasks',
    type: 'sub',
    icon: 'fa fa-tasks',
    children:[
      {state:'add', name:'Add task'},
      {state:'list',name:'List task'}
    ]
  },
    

];
@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
}
