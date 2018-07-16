import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ListComponent } from './list/list.component';
import { GridsComponent } from './grids/grids.component';
// import { FileUploaderComponent } from './imageBase64Uploader/file-uploader.component';
import { ComponentRoutes } from './components.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ComponentRoutes)
  ],
  declarations: [ 
    ListComponent,
    GridsComponent,
    // FileUploaderComponent
  ]
})

export class ComponentDemoModule {}