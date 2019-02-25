import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { ApiService } from './api.service';
import { NewsServiceMock } from './news-service-mock';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('NewsService', () => {
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let newsServiceMock: NewsServiceMock;
  let getQuoteSpy: jasmine.Spy;
  let getSourceSpy: jasmine.Spy;
  let getNewsSpy: jasmine.Spy;
  let fixture: ComponentFixture<NewsServiceMock>;
  let component: NewsServiceMock;

  beforeEach(() => {
    const spyApi = jasmine.createSpyObj('ApiService', ['getSources', 'getNews']);
    //getSourceSpy = spyApi.getSources.and.returnValue( of('news') );
    //getNewsSpy = spyApi.getNews.and.returnValue( of('news') );
    
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ], 
      providers: [
        ApiService,
        { provide: ApiService, useValue: spyApi }
      ]
    });

    newsServiceMock = TestBed.get(NewsServiceMock);
   
  });

  it('#getSources', () => {
    expect(newsServiceMock.getSources()).toBe(undefined, 'getSource called and return undefined');
  });
  
});