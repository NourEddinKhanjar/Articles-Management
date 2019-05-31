import {Component, ElementRef, OnInit} from '@angular/core';
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
  uploadedImgSrc: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private el: ElementRef,
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

  onUploadImage(event: any){
    let input = event.target;
    if (input.files && input.files[0]) {
      let reader = new FileReader();

      reader.onload = (e) => {
        this.uploadedImgSrc =  (<any>e.target).result;
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  add(){
    let img:any = this.el.nativeElement.getElementsByClassName("uploaded-img")[0];
    this.article.image = MainUtil.getBase64Image(img);
    this.articleService.set(this.article);
    this.router.navigate(["/articles"]);
  }
}
