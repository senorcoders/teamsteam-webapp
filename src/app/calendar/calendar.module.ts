import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule} from '@angular/material';
import { CalendarModule } from 'angular-calendar';

import { CalendarComponent } from './calendar.component';
import { CalendarRoutes } from './calendar.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    CalendarModule.forRoot(),
    RouterModule.forChild(CalendarRoutes)
  ],
  declarations: [ 
    CalendarComponent
  ]
})

export class CalendarDemoModule {}
