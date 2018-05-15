import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TreeModule } from 'ng2-tree';

import { FileManagerComponent } from './file-manager.component';
import { FileManagerRoutes } from './file-manager.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TreeModule,
    RouterModule.forChild(FileManagerRoutes)
  ],
  declarations: [ 
    FileManagerComponent
  ]
})

export class FileManagerModule {}
