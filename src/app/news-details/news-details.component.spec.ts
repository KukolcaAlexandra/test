import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Route, ActivatedRouteSnapshot, Params} from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsDetailsComponent } from './news-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NewsDetailsComponent', () => {
  let component: NewsDetailsComponent;
  let fixture: ComponentFixture<NewsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsDetailsComponent],
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule ],

      providers: [{
        provide: ActivatedRoute, useValue: {
          params: of({ id: 3 }),
          snapshot: {
            params: {
              id: '1'
            },
            paramMap: {
              get(name: string): string {
                return '';
              }
            }
          },
        }
      }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  it('should sourcseName be undefined', () => {
    fixture = TestBed.createComponent(NewsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.newsId).toEqual('1');
  });

});

