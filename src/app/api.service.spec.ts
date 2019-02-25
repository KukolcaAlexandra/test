import { async, inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, 
         Http,
         XHRBackend,
         Response,
         ResponseOptions} from '@angular/http';

import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { INews, ISource } from './interfaces/news';
import { SOURCES } from './mock-news-sources';
import { NEWS, LOCAL_NEWS } from './mock-news';

const makeSourceData = () => SOURCES;
const makeNewsData = () => NEWS[0];
const makeLocalNewsData = () => LOCAL_NEWS;
const fakeSource = NEWS[0][0].source.id;

describe('ApiService', () => {
  let backend: MockBackend;
  let service: ApiService;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [ HttpModule, HttpClientTestingModule ],
      providers: [
        ApiService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('can instantiate service via DI', () => {
      service = TestBed.get(ApiService);
      expect(service instanceof ApiService).toBe(true);
  });

  it('can instantiate service with "new"', () => {
    const http = TestBed.get(Http);
    expect(http).not.toBeNull('http should be provided');
    let service = new ApiService(http);
    expect(service instanceof ApiService).toBe(true, 'new service should be ok');
  });

  it('can provide the mockBackend as XHRBackend', () => {
    const backend = TestBed.get(XHRBackend);
    expect(backend).not.toBeNull('backend should be provided');
  });

  describe('when getSources', () => {
    let fakeSources: ISource[];
    let http: HttpClient;
    let response: Response;
  
    beforeEach(() => {
  
      backend = TestBed.get(XHRBackend);
      http = TestBed.get(HttpClient);
  
      service = new ApiService(http);
      fakeSources = makeSourceData();
      let options = new ResponseOptions({status: 200, body: {data: fakeSources}});
      response = new Response(options);
    });
  
    it('should have expected fake sources (then)', () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
  
      service.getSources().toPromise()
        .then(sources => {
          expect(sources.length).toBe(fakeSources.length,
            'should have expected no. of sources');
        })
        .catch(fail);
    });

    it('should have expected fake sources', () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.getSources().subscribe(
        sources => {
          expect(sources.length).toBe(fakeSources.length,
            'should have expected no. of sources');
        },
        fail
      );
    });

    it('should be OK returning no sources', () => {
      let resp = new Response(new ResponseOptions({status: 200, body: {data: []}}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getSources().subscribe(
        sources => {
          expect(sources.length).toBe(0, 'should have no sources');
        },
        fail
      );
    });

    it('should treat 404 as an Observable error', () => {
      let resp = new Response(new ResponseOptions({status: 404}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getSources().subscribe(
        sources => fail('should not respond with heroes'),
        err => {
          expect(err).toMatch(/Bad response status/, 'should catch bad response status code');
          return of(null); 
        });
    });
  
  });

  describe('when getNews', () => {
    let fakeNews: INews[];
    let http: HttpClient;
    let response: Response;
  
    beforeEach(() => {
  
      backend = TestBed.get(XHRBackend);
      http = TestBed.get(HttpClient);
  
      service = new ApiService(http);
      fakeNews = makeNewsData();
      let options = new ResponseOptions({status: 200, body: {data: fakeNews}});
      response = new Response(options);
    });
  
    it('should have expected fake news', () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
  
      service.getNews(fakeSource).toPromise()
        .then(news => {
          expect(news.length).toBe(fakeNews.length,
            'should have expected no. of news');
        })
        .catch(fail);
    });

    it('should be OK returning no news', () => {
      let resp = new Response(new ResponseOptions({status: 200, body: {data: []}}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getNews(fakeSource).subscribe(
        news => {
          expect(news.length).toBe(0, 'should have no news');
        },
        fail
      );
    });

    it('should treat 404 as an Observable error', () => {
      let resp = new Response(new ResponseOptions({status: 404}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getNews(fakeSource).subscribe(
        news => fail('should not respond with news'),
        err => {
          expect(err).toMatch(/Bad response status/, 'should catch bad response status code');
          return of(null); 
        });
    });
  
  });

  describe('when getLocalNews', () => {
    let fakeNews: INews[];
    let http: HttpClient;
    let response: Response;
  
    beforeEach(() => {
  
      backend = TestBed.get(XHRBackend);
      http = TestBed.get(HttpClient);
  
      service = new ApiService(http);
      fakeNews = makeLocalNewsData();
      let options = new ResponseOptions({status: 200, body: {data: fakeNews}});
      response = new Response(options);
    });
  
    it('should have expected fake local news', () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
  
      service.getLocalNews().toPromise()
        .then(news => {
          expect(news.length).toBe(fakeNews.length,
            'should have expected no. of local news');
        })
        .catch(fail);
    });

    it('should have expected fake local news', () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

      service.getLocalNews().subscribe(
        news => {
          expect(news.length).toBe(fakeNews.length,
            'should have expected no. of sources');
        },
        fail
      );
    });

    it('should be OK returning no news', () => {
      let resp = new Response(new ResponseOptions({status: 200, body: {data: []}}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getLocalNews().subscribe(
        news => {
          expect(news.length).toBe(0, 'should have no local news');
        },
        fail
      );
    });

    it('should treat 404 as an Observable error', () => {
      let resp = new Response(new ResponseOptions({status: 404}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getLocalNews().subscribe(
        news => fail('should not respond with news'),
        err => {
          expect(err).toMatch(/Bad response status/, 'should catch bad response status code');
          return of(null); 
        });
    });
  
  });

  describe('when onLoadNews', () => {
    let fakeNews: INews[];
    let http: HttpClient;
    let response: Response;
  
    beforeEach(() => {
  
      backend = TestBed.get(XHRBackend);
      http = TestBed.get(HttpClient);
  
      service = new ApiService(http);
      fakeNews = makeLocalNewsData();
      let options = new ResponseOptions({status: 200, body: {data: fakeNews}});
      response = new Response(options);
    });
  
    it('should have expected fake news', () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));
  
      service.onLoadNews(fakeSource).toPromise()
        .then(news => {
          expect(news.length).toBe(fakeNews.length,
            'should have expected no. of local news');
        })
        .catch(fail);
    });
 
  });

  describe('when getNewsWithId', () => {
    let fakeNews: INews[];
    let http: HttpClient;
    let response: Response;
  
    beforeEach(() => {
  
      backend = TestBed.get(XHRBackend);
      http = TestBed.get(HttpClient);
  
      service = new ApiService(http);
      fakeNews = makeLocalNewsData();
      let options = new ResponseOptions({status: 200, body: {data: fakeNews}});
      response = new Response(options);
    });
  
    it('should be OK returning no news', () => {
      let resp = new Response(new ResponseOptions({status: 200, body: {data: []}}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.getNewsWithId('1').subscribe(
        news => {
          expect(news.length).toBe(0, 'should have no news with id');
        },
        fail
      );
    });
 
  });

  describe('when updateNews', () => {
    let fakeNews: INews[];
    let http: HttpClient;
    let response: Response;
  
    beforeEach(() => {
  
      backend = TestBed.get(XHRBackend);
      http = TestBed.get(HttpClient);
  
      service = new ApiService(http);
      fakeNews = makeLocalNewsData();
      let options = new ResponseOptions({status: 200, body: {data: fakeNews}});
      response = new Response(options);
    });
  
    it('should be OK', () => {
      let resp = new Response(new ResponseOptions({status: 200, body: {data: []}}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.updateNews(fakeNews[0]).subscribe(
        news => {
          expect(news).toBeUndefined();
        },
        fail
      );
    });
 
  });

  describe('when addNews', () => {
    let fakeNews: INews[];
    let http: HttpClient;
    let response: Response;
  
    beforeEach(() => {
  
      backend = TestBed.get(XHRBackend);
      http = TestBed.get(HttpClient);
  
      service = new ApiService(http);
      fakeNews = makeLocalNewsData();
      let options = new ResponseOptions({status: 200, body: {data: fakeNews}});
      response = new Response(options);
    });
  
    it('should be OK', () => {
      let resp = new Response(new ResponseOptions({status: 200, body: {data: []}}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.addNews(fakeNews[0]).subscribe(
        news => {
          expect(news).toBeUndefined();
        },
        fail
      );
    });
 
  });

  describe('when deleteNews', () => {
    let fakeNews: INews[];
    let http: HttpClient;
    let response: Response;
  
    beforeEach(() => {
  
      backend = TestBed.get(XHRBackend);
      http = TestBed.get(HttpClient);
  
      service = new ApiService(http);
      fakeNews = makeLocalNewsData();
      let options = new ResponseOptions({status: 200, body: {data: fakeNews}});
      response = new Response(options);
    });
  
    it('should be OK', () => {
      let resp = new Response(new ResponseOptions({status: 200, body: {data: []}}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.deleteNews('0').subscribe(
        news => {
          expect(news).toBeUndefined();
        },
        fail
      );
    });
 
  });

  describe('when logIn', () => {
    let fakeNews: INews[];
    let http: HttpClient;
    let response: Response;
  
    beforeEach(() => {
  
      backend = TestBed.get(XHRBackend);
      http = TestBed.get(HttpClient);
  
      service = new ApiService(http);
      fakeNews = makeLocalNewsData();
      let options = new ResponseOptions({status: 200, body: {data: fakeNews}});
      response = new Response(options);
    });
  
    it('should be OK', () => {
      let resp = new Response(new ResponseOptions({status: 200, body: {data: []}}));
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(resp));

      service.logIn().subscribe(
        res => {
          expect(res).toBeUndefined();
        },
        fail
      );
    });
 
  });
});



/*describe('ApiService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let apiService: ApiService;

  //beforeEach(() => TestBed.configureTestingModule({
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    apiService = new ApiService(<any> httpClientSpy);
  });

  it('should return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
   
    httpClientSpy.get.and.returnValue(asyncError(errorResponse));
   
    heroService.getHeroes().subscribe(
      heroes => fail('expected an error, not heroes'),
      error  => expect(error.message).toContain('test 404 error')
    );
  });

  /*it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });*/
//});

/*describe('ValueService', () => {
  let service: ApiService;
  let httpClientSpy: { get: jasmine.Spy };
  beforeEach(() => { 
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new ApiService(<any> httpClientSpy);
  });
 
  it('#getPromiseValue should return value from a promise', () => {

  });
  /*
  it('#getValue should return real value', () => {
    const stubValue = [
      {
        id: "abc-news",
        name: "ABC News",
        description: "Your trusted source for breaking news, analysis, e…interviews, headlines, and videos at ABCNews.com.",
        url: "https://abcnews.go.com",
        category: "general"
      },
    ];
    expect(service.getSources()).toBe(stubValue);
  });*/
 /*
  it('#getObservableValue should return value from observable',
    (done: DoneFn) => {
    service.getObservableValue().subscribe(value => {
      expect(value).toBe('observable value');
      done();
    });
  });
 
  it('#getPromiseValue should return value from a promise',
    (done: DoneFn) => {
    service.getPromiseValue().then(value => {
      expect(value).toBe('promise value');
      done();
    });
  });*/
//});
