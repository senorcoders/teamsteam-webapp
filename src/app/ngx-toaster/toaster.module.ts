import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { ToasterComponent }  from './toaster.component';
import { ToasterRoutes } from './toaster.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ToastrModule.forRoot(),
    RouterModule.forChild(ToasterRoutes)
  ],
  declarations: [ 
    ToasterComponent
  ]
})

export class ToasterDemoModule {}
