import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AnimationComponent } from './animation.component';
import { AnimationRoutes } from './animation.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(AnimationRoutes)
  ],
  declarations: [ 
    AnimationComponent
  ]
})

export class AnimationDemoModule {}
