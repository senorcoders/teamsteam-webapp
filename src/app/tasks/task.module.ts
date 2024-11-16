import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {NgxMyDatePickerModule} from 'ngx-mydatepicker';

import {TaskRoutes} from './task.routing';
import {AddTaskComponent} from './add-task/add-task.component';
import {ListTaskComponent} from './list-task/list-task.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMyDatePickerModule,
    ToastrModule.forRoot(),
    RouterModule.forChild(TaskRoutes)
  ],
  declarations: [
    AddTaskComponent,
    ListTaskComponent
  ]
})

export class TaskModule {
}
