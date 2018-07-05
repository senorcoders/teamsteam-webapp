import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

import { BlogListingComponent } from './blog-listing/blog-listing.component';
import { BlogGridComponent } from './blog-grid/blog-grid.component';
import { BlogMasonryComponent } from './blog-masonry/blog-masonry.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
import { BlogsRoutes } from './blogs.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    QuillModule,
    RouterModule.forChild(BlogsRoutes)
  ],
  declarations: [ 
    BlogListingComponent,
    BlogGridComponent,
    BlogMasonryComponent,
    BlogDetailComponent,
    BlogEditComponent,
  ]
})

export class BlogsDemoModule {}
