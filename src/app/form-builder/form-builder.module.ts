import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {TeamService} from '../services/team.service';
import {AuthenticationService} from '../services/authentication.service';
import { ToastrModule } from 'ngx-toastr';

import {FormBuilderRoutes } from './form-builder.routing';
import {AddFormBuilderComponent} from './add-form-builder/add-form-builder.component';
import {ListFormBuilderComponent} from './list-form-builder/list-form-builder.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule.forChild(FormBuilderRoutes)
  ],
  declarations: [ 
    AddFormBuilderComponent,
    ListFormBuilderComponent
  ]
})

export class FormBuilderModule {}
