import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '../core/directive/directives.module';

import { NgxChartsModule} from '@swimlane/ngx-charts';

import { DashboardComponent } from './dashboard-v1/dashboard.component';
import { DashboardOneComponent } from './dashboard-v2/dashboard1.component';
import { DashboardRoutes } from './dashboard.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxChartsModule,
    DirectivesModule,
    RouterModule.forChild(DashboardRoutes)
  ],
  declarations: [ 
    DashboardComponent,
    DashboardOneComponent
  ]
})

export class DashboardModule {}
