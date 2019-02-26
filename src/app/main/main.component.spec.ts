import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { MainComponent } from './main.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NewsService } from '../news.service';
import { NewsServiceMock } from '../news-service-mock';
import { NEWS } from '../mock-news';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ MainComponent ],
      providers: [
        { provide: NewsService, useClass: NewsServiceMock }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should title be defined', () => {
    expect(component.title).toEqual('newsPortal');
  });

  it('should call filterNews', () => {
    expect(component.filterNews([])).toBe(undefined);
  });

  it('should filter News', () => {
    component.currentNews = NEWS[0];
    component.filterNews(['com']);
    expect(component.currentNews).not.toEqual(NEWS[0]);
  });

  it('should call loadNews', () => {
    component.news = NEWS[0];
    fixture.detectChanges();
    expect(component.loadNews({})).toBe(undefined);
  });

  it('should update newsCount to 5', () => {
    component.newsCount = 10;
    component.updateCount({});
    expect(component.newsCount).toEqual(5);
  });

  it('should not update newsCount to 5', () => {
    component.newsCount = 5;
    component.updateCount({});
    expect(component.newsCount).toEqual(5);
  });


});
