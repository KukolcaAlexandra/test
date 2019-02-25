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
    author: "Emily Shapiro",
    content: null,
    description: "Students and the remaining staff members are safe, the officials said.",
    publishedAt: "2019-02-08T18:21:00Z",
    source: {id: "abc-news", name: "ABC News"},
    title: "Staff member shot at Baltimore high school, adult suspect in custody: Officials",
    url: "https://abcnews.go.com/US/staff-member-shot-baltimore-high-school-adult-suspect/story?id=60935243",
    urlToImage: "https://s.abcnews.com/images/US/frederick-douglass-high-school-maryland-google-street-view-ht-jc-190208_hpMain_16x9_992.jpg",
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
    //fixture.detectChanges();
    //newsEl = fixture.debugElement.query(By.css('.news-block'));
    newsEl = fixture.debugElement.query(By.css('.title'));
    //component.title = expectedNews.title;
    component.news = expectedNews;
    //component.news.title = expectedNews.title;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*it('should display news title', () => {
    fixture.detectChanges();
    const expectedNewsTitle = expectedNews.title;
    expect(newsEl.nativeElement.textContent).toContain(expectedNewsTitle);
  });*/

  
});
