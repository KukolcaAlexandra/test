import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { EditNewsComponent } from './edit-news.component';
import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from '../mock/mock-router';

class MockRouter {
  navigateByUrl(url: string) { return url; }
}

describe('EditNewsComponent', () => {
  let component: EditNewsComponent;
  let fixture: ComponentFixture<EditNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [EditNewsComponent],
        providers: [
            { provide: ActivatedRoute, useClass: MockActivatedRoute }
        ],
        schemas: [NO_ERRORS_SCHEMA]
    })

    .compileComponents().then(() => {
      fixture = TestBed.createComponent(EditNewsComponent);
      component = fixture.componentInstance;
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initial title be Add', () => {
    expect(component.title).toEqual('Add');
  });

  it('should newsId be undefined', () => {
    expect(component.newsId).toBeUndefined();
  });

});
