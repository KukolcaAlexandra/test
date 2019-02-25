import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { ApiService } from './api.service';
import { NewsService } from './news.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('NewsService', () => {
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let newsService: NewsService;
  let getQuoteSpy: jasmine.Spy;
  let getSourceSpy: jasmine.Spy;
  let getNewsSpy: jasmine.Spy;
  let fixture: ComponentFixture<NewsService>;
  let component: NewsService;

  beforeEach(() => {
    const spyApi = jasmine.createSpyObj('ApiService', ['getSources', 'getNews']);
    getSourceSpy = spyApi.getSources.and.returnValue( of('news') );
    getNewsSpy = spyApi.getNews.and.returnValue( of('news') );
    
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ], 
      providers: [
        ApiService,
        { provide: ApiService, useValue: spyApi }
      ]
    });

    newsService = TestBed.get(NewsService);
    //newsService = new NewsService();
  });

  it('#getSources', () => {
    expect(newsService.getSources()).toBe(undefined, 'getSource called and return undefined');
  });

  

});

