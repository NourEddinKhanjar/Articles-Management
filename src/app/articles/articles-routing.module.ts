import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DashboardComponent} from '@articlesComponents/dashboard/dashboard.component';
import {ArticleComponent} from '@articlesComponents/article/article.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'article',
    component: ArticleComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ArticlesRoutingModule {
}
