import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {IArticle} from '@articlesModels/article/article.model';
import {ArticleService} from '@articlesServices/article/article.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  articles: IArticle[] = [];

  constructor(
    private domSanitization: DomSanitizer,
    private articleService: ArticleService,
    private cd: ChangeDetectorRef,
    private router: Router) {
  }

  ngOnInit() {
    this.articleService.getArticlesStream()
      .subscribe((articles: IArticle[]) => {
        this.articles = articles;
      });
  }

  addArticle() {
    this.router.navigate(['/articles/article']);
  }

  editArticle(article: IArticle) {
    this.router.navigate(['/articles/article', {article: article.id}]);
  }

  deleteArticle(article: IArticle) {
    this.articleService.remove(article);
  }

  /* ui helpers */
  getArticleImagePath(article: IArticle): SafeResourceUrl {
    return this.domSanitization.bypassSecurityTrustResourceUrl('data:image/jpg;base64,'
      + article.image);
  }

}
