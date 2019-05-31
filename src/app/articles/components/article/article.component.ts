import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Article, IArticle} from '@articlesModels/article/article.model';
import {ArticleService} from '@articlesServices/article/article.service';
import {MainUtil} from '@utils/main/main.util';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article: IArticle;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService) {
    let articleId: string = this.route.snapshot.paramMap.get("article");
    if(articleId){
      this.article = MainUtil.clone<IArticle>(this.articleService.get(articleId));
    }else{
      this.article = Article.create();
    }
  }

  ngOnInit() {
  }


  add(){
    this.articleService.set(this.article);
    this.router.navigate(["/articles"]);
  }
}
