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
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set news title', () => {
    component.news = NEWS[0][0];
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const h1 = fixture.debugElement.query(By.css('.title'));
      const el = h1.nativeElement;
      expect(el.textContent).toBe(component.news.title);
    });
  });

  it('should set news description', () => {
    component.news = NEWS[0][0];
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const h1 = fixture.debugElement.query(By.css('.description'));
      const el = h1.nativeElement;
      expect(el.textContent).toBe(component.news.description);
    });
  });

  it('should call editNews', () => {
    expect(component.editNews()).toBe(undefined);
  });

  it('should call deleteNews', () => {
    expect(component.deleteNews()).toBe(undefined);
  });

  it('should call filterNews', () => {
    component.news = {
      _id: '1',
      author: '',
      title: ''
    };
    component.ngOnInit();
    expect(component.id).toEqual('1');
  });
});
