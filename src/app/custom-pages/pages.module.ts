import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TestimonialsComponent } from './testimonials/testimonials.component';
import { TimelineComponent } from './timeline/timeline.component';
import { PricingComponent } from './pricing/pricing.component';
import { BlankComponent } from './blank/blank.component';
import { PagesRoutes } from './pages.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(PagesRoutes)
  ],
  declarations: [ 
    TestimonialsComponent,
    TimelineComponent,
    PricingComponent,
    BlankComponent,
  ]
})

export class PagesDemoModule {}
