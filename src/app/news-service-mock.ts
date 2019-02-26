import { Injectable, EventEmitter } from '@angular/core';
import { SOURCES } from './mock-news-sources';
import { NEWS, LOCAL_NEWS } from './mock-news';
import { ApiService } from './api.service';
import { INews, ISource } from './interfaces/news';
import { initialSourceName, localSourceName } from './const';
import { Component, OnInit, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsServiceMock {

  constructor(private apiService: ApiService) { }

  public updatedSources: EventEmitter<any> = new EventEmitter();
  public updatedNews: EventEmitter<any> = new EventEmitter();
  public updatedSourceName: EventEmitter<string> = new EventEmitter();
  public updatedCurrentNews: EventEmitter<INews> = new EventEmitter();
  selectedSource: number;
  sources: ISource[];
  articles: any = [];
  previousNews: any = [];
  sourceName: string = initialSourceName;
  previousSourceName: string;
  currentNews: INews;

  ngOnInit() {
    this.currentNews = NEWS[0][0];
  }

  getSources() {
    this.sources = SOURCES;
    this.updatedSources.emit(SOURCES);
  }

  getNews() {
    this.articles = NEWS;
    this.updatedNews.emit(NEWS);
    const sourceId = this.sources[this.selectedSource].id;
    const sourceName = this.sources[this.selectedSource].name;
    this.sourceName = sourceName;
    this.updatedSourceName.emit(sourceName);
  }

  getLocalNews() {
    this.articles = LOCAL_NEWS;
    this.updatedNews.emit(LOCAL_NEWS);
    this.sourceName = localSourceName;
    this.updatedSourceName.emit(localSourceName);
  }

  onCheckMyNews(checked: boolean) {
    if (checked) {
      this.previousNews = this.articles;
      this.previousSourceName = this.sourceName;
      this.getLocalNews();
    } else {
      if (this.selectedSource >= 0) {
        this.articles = this.previousNews;
        this.sourceName = this.previousSourceName;
        this.updatedSourceName.emit(this.previousSourceName);
      } else {
        this.articles = [];
        this.sourceName = initialSourceName;
        this.updatedSourceName.emit(initialSourceName);
      }
      this.updatedNews.emit(this.articles);
    }
  }

  onLoadNews() {
    const sourceId = this.sources[this.selectedSource].id;
    this.apiService.onLoadNews(sourceId).subscribe(
      (articles: any) => {
        this.articles = articles;
        this.updatedNews.emit(articles);
      }
    );
  }

  getNewsWithId(id: string) {
    if (this.sourceName === localSourceName) {
      this.currentNews = LOCAL_NEWS[0];
      this.updatedCurrentNews.emit(this.currentNews);
    } else {
      this.currentNews = this.articles[id];
      this.updatedCurrentNews.emit(this.currentNews);
    }
  }

  updateNews(news: INews) {
  }

  addNews(news: INews) {
  }

  deleteNews(id: string) {
  }

  logIn() {
  }

}
