import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResizableModule } from 'angular-resizable-element';

import { ResizableComponent }  from './resizable.component';
import { ResizableRoutes } from './resizable.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ResizableModule,
    RouterModule.forChild(ResizableRoutes)
  ],
  declarations: [ 
    ResizableComponent
  ]
})

export class ResizableDemoModule {}
