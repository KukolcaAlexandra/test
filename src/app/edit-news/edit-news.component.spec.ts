import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { EditNewsComponent } from './edit-news.component';
import { ActivatedRoute } from '@angular/router';
//import { of } from 'rxjs';
import { MockActivatedRoute } from '../mock/mock-router';
//import { RouterTestingModule } from '@angular/router/testing';
//import { RouterTestingModule } from '@angular/t'
//import { Router } from '@angular/router';

class MockRouter {
  navigateByUrl(url: string) { return url; }
}

describe('EditNewsComponent', () => {
  let component: EditNewsComponent;
  let fixture: ComponentFixture<EditNewsComponent>;
  // updated beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [EditNewsComponent],
        providers: [
            { provide: ActivatedRoute, useClass: MockActivatedRoute }
        ],
        schemas: [NO_ERRORS_SCHEMA]
    })
    // the below was added
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
