import { Routes } from '@angular/router';

import { GlyphiconsComponent}  from './glyphicons/glyphicons.component';
import { FontAwesomeComponent}  from './font-awesome/font-awesome.component';
import { MaterialIconComponent}  from './material-icons/material-icons.component';
import { LineaComponent}  from './linea/linea.component';
import { SimpleLineIconsComponent}  from './simple-line-icons/simple-line-icons.component';

export const IconsRoutes: Routes = [{
  path: '',
  redirectTo: 'glyphicons',
  pathMatch: 'full',
},{
  path: '',
  children: [{
    path: 'glyphicons',
    component: GlyphiconsComponent
  }, {
    path: 'fontawesome',
    component: FontAwesomeComponent
  }, {
    path: 'material-icons',
    component: MaterialIconComponent
  }, {
    path: 'linea',
    component: LineaComponent
  }, {
    path: 'simple-line-icons',
    component: SimpleLineIconsComponent
  }]
}];
