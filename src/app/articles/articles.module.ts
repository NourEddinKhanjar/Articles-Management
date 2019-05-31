import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {ArticlesRoutingModule} from './articles-routing.module';

import {DashboardComponent} from './components/dashboard/dashboard.component';
import {HeaderComponent} from './components/header/header.component';
import {ArticleComponent} from './components/article/article.component';

import {ArticleService} from '@articlesServices/article/article.service';

@NgModule({
  declarations: [DashboardComponent, HeaderComponent, ArticleComponent],
  imports: [
    CommonModule,
    FormsModule,
    ArticlesRoutingModule
  ],
  providers: [ArticleService]
})
export class ArticlesModule {
}
