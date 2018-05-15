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
    state: 'http://chankya-ui.theironnetwork.org',
    name: 'UI PANEL',
    type: 'ext-link',
    icon: 'icon-equalizer icons'
  },
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
    state: 'inbox',
    name: 'INBOX',
    type: 'link',
    icon: 'icon-envelope-letter icons'
  },
  {
    state: 'chat',
    name: 'CHAT',
    type: 'link',
    icon: 'icon-bubbles icons'
  },
  {
    state: 'calendar',
    name: 'CALENDAR',
    type: 'link',
    icon: 'icon-calendar icons'
  },
  {
    state: 'ui-elements',
    name: 'UI-ELEMENTS',
    type: 'sub',
    icon: 'icon-equalizer icons',
    children: [
      {state: 'buttons', name: 'BUTTONS'},
      {state: 'progressbar', name: 'PROGRESS BAR'},
      {state: 'tabs', name: 'TABS'},
      {state: 'accordions', name: 'ACCORDIONS'},
      {state: 'pagination', name: 'PAGINATION'},
      {state: 'tooltip', name: 'TOOLTIP'},
      {state: 'badges', name: 'BADGES'},
      {state: 'cards', name: 'CARDS'},
      {state: 'social-icons', name: 'SOCIAL ICONS'},
      {state: 'typography', name: 'TYPOGRAPHY'},
      {state: 'dropdown', name: 'DROPDOWN'},
      {state: 'alert', name: 'ALERT'},
      {state: 'carousel', name: 'CAROUSEL'},
      {state: 'datepicker', name: 'DATEPICKER'},
    ]
  },
  {
    state: 'components',
    name: 'COMPONENTS',
    type: 'sub',
    icon: 'icon-layers icons',
    children: [
      {state: 'list', name: 'LIST'},
      {state: 'grids', name: 'GRIDS'},
    ]
  },
  {
    state: 'icons',
    name: 'ICONS',
    type: 'sub',
    icon: 'icon-flag icons',
    children: [
      {state: 'glyphicons', name: 'GLYPHICONS'},
      {state: 'fontawesome', name: 'FONTAWESOME'},
      {state: 'material-icons', name: 'MATERIAL ICONS'},
      {state: 'linea', name: 'LINEA'},
      {state: 'simple-line-icons', name: 'SIMPLE LINE ICONS'},
    ]
  },
  {
    state: 'forms',
    name: 'FORMS',
    type: 'sub',
    icon: 'icon-doc icons',
    children: [
      {state: 'form-wizard', name: 'FORM WIZARD'},
      {state: 'form-elements', name: 'FORM ELEMENTS'},
      {state: 'form-group', name: 'FORM GROUP'},
      {state: 'form-validation', name: 'FORM VALIDATION'},
      {state: 'form-upload', name: 'UPLOAD'},
      {state: 'form-tree', name: 'TREE'}
    ]
  },
  {
    state: 'tables',
    name: 'TABLES',
    type: 'sub',
    icon: 'icon-grid icons',
    children: [
      {state: 'basic', name: 'Basic'},
      {state: 'fullscreen', name: 'FULLSCREEN'},
      {state: 'selection', name: 'SELECTION'},
      {state: 'pinning', name: 'PINNING'},
      {state: 'sorting', name: 'SORTING'},
      {state: 'paging', name: 'PAGING'},
      {state: 'editing', name: 'EDITING'},
      {state: 'filter', name: 'FILTER'},
      {state: 'responsive', name: 'Responsive'},
      {state: 'foo', name: 'FOO'},
    ]
  },
  {
    state: 'editor',
    name: 'EDITOR',
    type: 'sub',
    icon: 'icon-note icons',
    children: [
      {state: 'ace-editor', name: 'ACE EDITOR'},
      {state: 'summer-editor', name: 'SUMMER EDITOR'},
      {state: 'wysiwyg', name: 'WYSIWYG EDITOR'},
      {state: 'ckeditor', name: 'CKEDITOR'},
    ]
  },
  {
    state: 'chart',
    name: 'CHARTS',
    type: 'sub',
    icon: 'icon-chart icons',
    children: [
      {state: 'ng2-charts', name: 'NG2 CHARTS'},
      {state: 'ngx-charts', name: 'NGX CHARTS'},
      {state: 'easy-pie-chart', name: 'EASY PIE'},
      {state: 'google-chart', name: 'GOOGLE CHARTS'},
    ]
  },
  {
    state: 'dragndrop',
    name: 'DRAG & DROP',
    type: 'sub',
    icon: 'icon-share-alt icons',
    children: [
      {state: 'dragula', name: 'DRAGULA'},
      {state: 'sortable', name: 'SORTABLEJS'}
    ]
  },
  {
    state: 'resizable',
    name: 'RESIZABLE',
    type: 'link',
    icon: 'icon-cursor-move icons'
  },
  {
    state: 'ngx-toaster',
    name: 'NGX TOASTER',
    type: 'link',
    icon: 'icon-menu icons'
  },
  {
    state: 'animation',
    name: 'ANIMATION',
    type: 'link',
    icon: 'icon-refresh icons fa-spin'
  },
  {
    state: 'file-manager',
    name: 'FILE MANAGER',
    type: 'link',
    icon: 'icon-refresh icons'
  },
  {
    state: 'maps',
    name: 'MAPS',
    type: 'sub',
    icon: 'icon-map icons',
    children: [
      {state: 'googlemap', name: 'GOOGLE MAP'},
      {state: 'vectormap', name: 'VECTOR MAP'},
      {state: 'leafletmap', name: 'LEAFLET MAP'}
    ]
  },
  {
    state: 'user-pages',
    name: 'USER PAGES',
    type: 'sub',
    icon: 'icon-people icons',
    children: [
      {state: 'userlist', name: 'USER LIST'},
      {state: 'usertable', name: 'USER TABLE'},
      {state: 'userprofile', name: 'USER PROFILE'},
      {state: 'usercontact', name: 'USER CONTACT'}
    ]
  },
  {
    state: 'pages',
    name: 'PAGES',
    type: 'sub',
    icon: 'icon-book-open icons',
    children: [
      {state: 'testimonials', name: 'TESTIMONIALS'},
      {state: 'timeline', name: 'TIMELINE'},
      {state: 'pricing', name: 'PRICING'},
      {state: 'blank', name: 'BLANK'},
    ]
  },
  {
    state: 'session',
    name: 'SESSIONS',
    type: 'sub',
    icon: 'icon-login icons',
    children: [
      {state: 'loginone', name: 'LOGIN'},
      {state: 'register', name: 'REGISTER'},
      {state: 'forgot-password', name: 'FORGOT'},
      {state: 'coming-soon', name: 'COMING SOON'},
      {state: 'lockscreen', name: 'LOCKSCREEN'},
      {state: 'subscribes', name: 'SUBSCRIBES'},
      {state: 'undermaintance', name: 'UNDER MAINTANCE'},
      {state: 'not-found', name: '404'},
    ]
  },
  {
    state: 'blog',
    name: 'BLOG',
    type: 'sub',
    icon: 'icon-notebook icons',
    children: [
      {state: 'blog-listing', name: 'BLOG LISTING'},
      {state: 'blog-grid', name: 'BLOG GRID'},
      {state: 'blog-masonry', name: 'BLOG MASONRY'},
      {state: 'blog-detail', name: 'BLOG DETAIL'},
      {state: 'blog-edit', name: 'BLOG EDIT'},
    ]
  },
  {
    state: 'gallery',
    name: 'GALLERY',
    type: 'sub',
    icon: 'icon-picture icons',
    children: [
      {state: 'gallery-v1', name: 'GALLERY V1'},
      {state: 'gallery-v2', name: 'GALLERY V2'},
      {state: 'gallery-v3', name: 'GALLERY V3'},
    ]
  },
  {
    state: 'ecommerce',
    name: 'ECOMMERCE',
    type: 'sub',
    icon: 'icon-handbag icons',
    children: [
      {state: 'ecommerce-product', name: 'PRODUCT'},
      {state: 'ecommerce-product-detail', name: 'PRODUCT DETAIL'},
      {state: 'ecommerce-product-list', name: 'PRODUCT LIST'},
      {state: 'ecommerce-product-cart', name: 'PRODUCT CART'},
      {state: 'ecommerce-order', name: 'ORDER'},
      {state: 'ecommerce-order-detail', name: 'ORDER DETAIL'},
      {state: 'invoice', name: 'INVOICE'},
    ]
  }

];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
  add(menu: Menu) {
    MENUITEMS.push(menu);
  }
}
