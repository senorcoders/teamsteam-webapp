import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { SortablejsModule, SortablejsOptions} from "angular-sortablejs";

import { DragulaDemoComponent}  from './dragula/dragula.component';
import { SortableDemoComponent}  from './sortablejs/sortable.component';
import { DragDropRoutes } from './dragndrop.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DragulaModule,
    SortablejsModule,
    RouterModule.forChild(DragDropRoutes)
  ],
  declarations: [ 
    DragulaDemoComponent,
    SortableDemoComponent,
  ]
})

export class DragDropDemoModule {}
