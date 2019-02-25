import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NewsComponent } from './news.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { NewsServiceMock } from '../news-service-mock';
import { NewsService } from '../news.service';
import { NEWS } from '../mock-news';

class MockRouter {
  navigateByUrl(url: string) { return url; }
}

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      providers: [
        { provide: NewsService, useClass: NewsServiceMock }
      ]
      /*providers: [
        { provide: ActivatedRoute, useClass: MockRouter }
      ],*/
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set news title', () => {
    component.news = NEWS[0][0];
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let h1 = fixture.debugElement.query(By.css('.title'));
      let el = h1.nativeElement;
      expect(el.textContent).toBe(component.news.title);
    });
  });

  it('should set news description', () => {
    component.news = NEWS[0][0];
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let h1 = fixture.debugElement.query(By.css('.description'));
      let el = h1.nativeElement;
      expect(el.textContent).toBe(component.news.description);
    });
  });

  /*it('should set news publishedAt', () => {
    component.news = NEWS[0][0];
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      let h1 = fixture.debugElement.query(By.css('.dateBlock'));
      //let el = h1.nativeElement;
      expect(el.textContent).toBe(component.news.publishedAt);
    });
  });*/
  
});
