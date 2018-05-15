import { Routes } from '@angular/router';

import { TestimonialsComponent } from './testimonials/testimonials.component';
import { TimelineComponent } from './timeline/timeline.component';
import { PricingComponent } from './pricing/pricing.component';
import { BlankComponent } from './blank/blank.component';

export const PagesRoutes: Routes = [{
  path: '',
  redirectTo: 'user-list',
  pathMatch: 'full',
},{
  path: '',
  children: [{
    path: 'testimonials',
    component: TestimonialsComponent
  }, {
    path: 'timeline',
    component: TimelineComponent
  }, {
    path: 'pricing',
    component: PricingComponent
  }, {
    path: 'blank',
    component: BlankComponent
  }]
}];