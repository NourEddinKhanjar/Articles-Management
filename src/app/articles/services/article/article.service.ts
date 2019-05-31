import {Injectable} from '@angular/core';

import {StorageService} from '@services/storage/storage.service';
import {IArticle} from '@articlesModels/article/article.model';
import {StorageKeyType} from '@models/storage/storage-keys';
import {SignedUserService} from '@services/signed-user/signed-user.service';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable()
export class ArticleService {

  private readonly articleSubject: BehaviorSubject<IArticle[]>;
  private readonly articles: Map<string, IArticle>;

  constructor(private storageService: StorageService, private signedUserService: SignedUserService) {
    this.articles = new Map();
    this.articleSubject = new BehaviorSubject([]);
    this.initArticles();
    this.pushArticlesUpdate();
  }

  getArticlesStream(): Subject<IArticle[]>{
    return this.articleSubject;
  }

  set(article: IArticle): void{
    this.articles.set(article.id, article);
    this.setStoredArticles();
    this.pushArticlesUpdate();
  }

  get(id: string): IArticle{
    return this.articles.get(id);
  }

  remove(article: IArticle): void{
    this.articles.delete(article.id);
    this.setStoredArticles();
    this.pushArticlesUpdate();
  }

  private initArticles(): void {
    const storedArticlesMap = this.getStoredArticles();
    const loggedInUser = this.signedUserService.getSignedUser();
    const loggedInUserArticles = storedArticlesMap.get(loggedInUser.email);

    if(!loggedInUserArticles){
      return;
    }

    Object.keys(loggedInUserArticles).forEach(key => {
      this.articles.set(key, loggedInUserArticles[key]);
    });
  }

  private getStoredArticles(): Map<string, Map<string, IArticle>> {
    const storedArticleMap = this.storageService.get<Map<string, Map<string, IArticle>>>(StorageKeyType.Articles) || new Map();
    let articleMap:Map<string, Map<string, IArticle>> = new Map();
    Object.keys(storedArticleMap).forEach((userEmail: string) => {
      articleMap.set(userEmail, storedArticleMap[userEmail]);
    });

    return articleMap;
  }

  private setStoredArticles(): void{
    const allStoredArticles = this.getStoredArticles();
    const loggedInUser = this.signedUserService.getSignedUser();
    allStoredArticles.set(loggedInUser.email, this.articles);
    let hash = {};
    allStoredArticles.forEach((value, key) => {
      let valueHash = {};
      value.forEach((innerValue, innerKey) => {
        valueHash[innerKey] = innerValue;
      });
      hash[key] = valueHash;
    });
    this.storageService.set(StorageKeyType.Articles, hash);
  }

  private pushArticlesUpdate(): void{
    this.articleSubject.next(Array.from(this.articles.values()));
  }
}
