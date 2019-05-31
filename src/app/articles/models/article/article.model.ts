import {MainUtil} from '@utils/main/main.util';

export interface IArticle {
  id: string;
  title: string;
  content: string;
  date: Date;
  image: string;
}

export class Article implements IArticle{
  content: string;
  date: Date;
  id: string;
  image: string;
  title: string;

  constructor() {
    this.id = MainUtil.guid();
    this.date = new Date();
    this.content = "";
    this.image = "";
    this.title = "";
  }


  static create(): Article{
    return new Article();
  }
}
