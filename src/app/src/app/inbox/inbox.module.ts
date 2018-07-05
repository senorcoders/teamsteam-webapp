import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InboxComponent } from './inbox.component';
import { InboxRoutes } from './inbox.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(InboxRoutes)
  ],
  declarations: [ 
    InboxComponent
  ]
})

export class InboxModule {}
