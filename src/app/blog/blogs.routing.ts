import { Routes } from '@angular/router';

import { BlogListingComponent } from './blog-listing/blog-listing.component';
import { BlogGridComponent } from './blog-grid/blog-grid.component';
import { BlogMasonryComponent } from './blog-masonry/blog-masonry.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';

export const BlogsRoutes: Routes = [{
  path: '',
  redirectTo: 'blog-list',
  pathMatch: 'full',
},{
  path: '',
  children: [{
    path: 'blog-listing',
    component: BlogListingComponent
  }, {
    path: 'blog-grid',
    component: BlogGridComponent
  }, {
    path: 'blog-masonry',
    component: BlogMasonryComponent
  }, {
    path: 'blog-detail',
    component: BlogDetailComponent
  }, {
    path: 'blog-edit',
    component: BlogEditComponent
  }]
}];
