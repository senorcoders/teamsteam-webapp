import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GalleryOneComponent } from './gallery-v1/gallery-v1.component';
import { GalleryTwoComponent } from './gallery-v2/gallery-v2.component';
import { GalleryThreeComponent } from './gallery-v3/gallery-v3.component';
import { GalleryRoutes } from './gallery.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(GalleryRoutes)
  ],
  declarations: [ 
    GalleryOneComponent,
    GalleryTwoComponent,
    GalleryThreeComponent,
  ]
})

export class GalleryDemoModule {}
