import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { ApiService } from './api.service';
import { NewsService } from './news.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError, from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MockBackend } from '@angular/http/testing';
import { SOURCES } from './mock-news-sources';
import { NEWS } from './mock-news';

describe('NewsService', () => {

  let service: NewsService;

  beforeEach(() => {

    const spyApi = jasmine.createSpyObj('ApiService', ['getSources', 'getNews']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [ ApiService ]
    });
  });

  it('should call logIn and return undefined value', () => {
    const spyApi = jasmine.createSpyObj('ApiService', ['logIn']);
    service = TestBed.get(NewsService);
    expect(service.logIn()).toBe(undefined);
  });

  it('should call deleteNews and return undefined value', () => {
    service = TestBed.get(NewsService);
    expect(service.deleteNews('0')).toBe(undefined);
  });

  it('should call getSources and return undefined value', () => {
    service = TestBed.get(NewsService);
    expect(service.getSources()).toBe(undefined);
  });

  it('should call getLocalNews and return undefined value', () => {
    service = TestBed.get(NewsService);
    expect(service.getLocalNews()).toBe(undefined);
  });

  it('should call getNewsWithId and return undefined value', () => {
    service = TestBed.get(NewsService);
    expect(service.getNewsWithId('0')).toBe(undefined);
  });

  it('should call onCheckMyNews and return undefined value', () => {
    service = TestBed.get(NewsService);
    expect(service.onCheckMyNews(true)).toBe(undefined);
  });

  it('should call updateNews and return undefined value', () => {
    const fakeNews = {
      id: '0',
      title: '',
      text: '',
      author: ''
    };
    service = TestBed.get(NewsService);
    expect(service.updateNews(fakeNews)).toBe(undefined);
  });

  it('should call addNews and return undefined value', () => {
    const fakeNews = {
      id: '0',
      title: '',
      text: '',
      author: ''
    };
    service = TestBed.get(NewsService);
    expect(service.addNews(fakeNews)).toBe(undefined);
  });

  it('should sources to be undefined', () => {
    service = TestBed.get(NewsService);
    service.getSources();
    expect(service.sources).toBe(undefined);
  });

  it('should call getNews and return undefined value', () => {
    service = TestBed.get(NewsService);
    service.selectedSource = 0;
    service.sources = SOURCES;
    expect(service.getNews()).toBe(undefined);
  });

  it('should call onLoadNews and return undefined value', () => {
    service = TestBed.get(NewsService);
    service.selectedSource = 0;
    service.sources = SOURCES;
    expect(service.onLoadNews()).toBe(undefined);
  });

  it('should call changeData and return undefined value', () => {
    service = TestBed.get(NewsService);
    expect(service.changeData([], '')).toBe(undefined);
  });

});

