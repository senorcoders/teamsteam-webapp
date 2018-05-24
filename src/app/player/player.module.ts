import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {TeamService} from '../services/team.service';
import {AuthenticationService} from '../services/authentication.service';
import { ToastrModule } from 'ngx-toastr';

import {PlayerRoutes } from './player.routing';
import {AddPlayerComponent} from './add-player/add-player.component';
import {ListPlayerComponent} from './list-player/list-player.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule.forChild(PlayerRoutes)
  ],
  declarations: [ 
    AddPlayerComponent,
    ListPlayerComponent
  ]
})

export class PlayerModule {}
