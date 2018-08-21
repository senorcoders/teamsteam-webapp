import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import {LeagueRoutes } from './league.routing';
import { ListLeagueComponent } from './list-league/list-league.component';
import { AddLeagueComponent } from './add-league/add-league.component';
import { AddTeamModal } from './add-team-modal/add-team-modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule.forChild(LeagueRoutes),
  ],
  declarations: [
    ListLeagueComponent,
    AddLeagueComponent
  ]
})

export class LeagueModule {}