import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { EditNewsComponent } from './edit-news.component';
import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from '../mock/mock-router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('EditNewsComponent', () => {
  let component: EditNewsComponent;
  let fixture: ComponentFixture<EditNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [EditNewsComponent],
        imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule ],
        providers: [
            { provide: ActivatedRoute, useValue: {
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

  it('should title be Edit', () => {
    component.newsId = '1';
    fixture.detectChanges();
    expect(component.title).toEqual('Edit');
  });

});
