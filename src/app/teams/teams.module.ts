import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {TeamService} from '../services/team.service';
import {AuthenticationService} from '../services/authentication.service';
import {FileUploaderComponent } from '../components/imageBase64Uploader/file-uploader.component';

import { ToastrModule } from 'ngx-toastr';

import {TeamsRoutes } from './teams.routing';
import {AddTeamComponent} from './add-team/add-team.component';
import {ListTeamComponent} from './list-team/list-team.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule.forChild(TeamsRoutes)
  ],
  declarations: [ 
    AddTeamComponent,    
    ListTeamComponent,
    FileUploaderComponent
  ]
})

export class TeamModule {}
