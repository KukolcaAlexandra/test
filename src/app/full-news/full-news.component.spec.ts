import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FullNewsComponent } from './full-news.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('FullNewsComponent', () => {
  let component: FullNewsComponent;
  let fixture: ComponentFixture<FullNewsComponent>;
  let newsEl: DebugElement;
  const expectedNews = {
    author: 'Emily Shapiro',
    content: null,
    description: 'Students and the remaining staff members are safe, the officials said.',
    publishedAt: '2019-02-08T18:21:00Z',
    source: {id: 'abc-news', name: 'ABC News'},
    title: 'Staff member shot at Baltimore high school, adult suspect in custody: Officials',
    url: 'https://abcnews.go.com/US/staff-member-shot-baltimore-high-school-adult-suspect/story?id=60935243',
    urlToImage: 'https://s.abcnews.com/images/US/16x9_992.jpg',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullNewsComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullNewsComponent);
    component = fixture.componentInstance;
    newsEl = fixture.debugElement.query(By.css('.title'));
    component.news = expectedNews;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onDelete', () => {
    expect(component.onDelete()).toBe(undefined);
  });
});
