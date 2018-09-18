import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { EventsRoutes } from './events.routing';
import { AddEventComponent } from './add/add-event.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { AgmCoreModule } from '@agm/core'
import { ListEventComponent } from './list/list-event.component';
import { EditEventComponent } from './edit/edit-event.component';
import { DetailEventComponent } from './detail/detail-event.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule.forChild(EventsRoutes),
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyAFLgCYDZUvB1CeR3IQDjoIfK-yVkSBm7Q' }),
    UiSwitchModule
  ],
  declarations: [
      AddEventComponent,
      ListEventComponent,
      EditEventComponent,
      DetailEventComponent
  ]
})

export class EventsModule {}