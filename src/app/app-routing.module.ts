import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {UserGuardService} from '@services/user-guard/user-guard.service';
import {ArticlesGuardService} from '@services/articles-guard/articles-guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user'
  },
  {
    path: 'user',
    loadChildren: './user/user.module#UserModule',
    canLoad: [UserGuardService]
  },
  {
    path: 'articles',
    loadChildren: './articles/articles.module#ArticlesModule',
    canLoad: [ArticlesGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
