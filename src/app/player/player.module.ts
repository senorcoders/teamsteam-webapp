import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';

import {PlayerRoutes} from './player.routing';
import {AddPlayerComponent} from './add-player/add-player.component';
import {ListPlayerComponent} from './list-player/list-player.component'
import {AddRosterComponent} from './add-roster/add-roster.component';
import {ViewPlayerComponent} from './view-player/view-player.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule.forChild(PlayerRoutes),
  ],
  declarations: [
    AddPlayerComponent,
    ListPlayerComponent,
    AddRosterComponent,
    ViewPlayerComponent
  ]
})

export class PlayerModule {
}
