import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EditFormComponent } from './edit-form.component';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NewsService } from '../news.service';
import { NewsServiceMock } from '../news-service-mock';

describe('EditFormComponent', () => {
  let component: EditFormComponent;
  let fixture: ComponentFixture<EditFormComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFormComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: NewsService, useClass: NewsServiceMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFormComponent);
    component = fixture.componentInstance;

    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should news be undefined', () => {
    expect(component.newsId).toBeUndefined();
  });

  it('should heading news be empty', () => {
    let input = fixture.debugElement.query(By.css('.title'));
    let el = input.nativeElement;
    expect(el.value).toEqual('');
  });

  it('should short dsecription news be empty', () => {
    let input = fixture.debugElement.query(By.css('.short'));
    let el = input.nativeElement;
    expect(el.value).toEqual('');
  });

  it('should image input be empty', () => {
    let input = fixture.debugElement.query(By.css('.imageInput'));
    let el = input.nativeElement;
    expect(el.value).toEqual('');
  });

  it('should date input be empty', () => {
    let input = fixture.debugElement.query(By.css('.date'));
    let el = input.nativeElement;
    expect(el.value).toEqual('');
  });

  it('should author input be empty', () => {
    let input = fixture.debugElement.query(By.css('.author'));
    let el = input.nativeElement;
    expect(el.value).toEqual('');
  });

  it('should source url input be empty', () => {
    let input = fixture.debugElement.query(By.css('.sourceUrl'));
    let el = input.nativeElement;
    expect(el.value).toEqual('');
  });

  it('should set submitted to true', async(() => {
    component.onSubmit();
    expect(component.submitted).toBeTruthy();
  }));

  it('should news be defined', () => {
    component.newsId = '0';
    fixture.detectChanges();
    expect(component.newsId).toBeDefined();
  });

  it('should call the onSubmit method', async(() => {
    fixture.detectChanges();
    spyOn(component, 'onSubmit');
    el = fixture.debugElement.query(By.css('.submit')).nativeElement;
    el.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(0);
  }));

  it('form should be invalid', async(() => {
    component.newsForm.controls['heading'].setValue('');
    component.newsForm.controls['content'].setValue('');
    component.newsForm.controls['author'].setValue('');
    expect(component.newsForm.valid).toBeFalsy();
  }));

  it('form should be valid', async(() => {
    component.newsForm.controls['heading'].setValue('News');
    component.newsForm.controls['content'].setValue('Description');
    component.newsForm.controls['author'].setValue('AI');
    expect(component.newsForm.valid).toBeTruthy();
  }));

  it('should call the onSubmit method', async(() => {
    spyOn(component, 'onSubmit');
    component.newsForm.controls['heading'].setValue('News');
    component.newsForm.controls['content'].setValue('Description');
    component.newsForm.controls['author'].setValue('AI');
    fixture.detectChanges();
    el = fixture.debugElement.query(By.css('.submit')).nativeElement;
    el.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  }));

  it('should set title of news', async(() => {
    
    component.newsForm.controls['heading'].setValue('Test news');
    fixture.detectChanges();
    
    fixture.whenStable().then(() => {
      let input = fixture.debugElement.query(By.css('.title'));
      let el = input.nativeElement;

      expect(el.value).toBe('Test news');
    });
  }));

  it('should set content of news', async(() => {
    
    component.newsForm.controls['content'].setValue('Text');
    fixture.detectChanges();
    
    fixture.whenStable().then(() => {
      let input = fixture.debugElement.query(By.css('.content'));
      let el = input.nativeElement;

      expect(el.value).toBe('Text');
    });
  }));

  it('should set author of news', async(() => {
    
    component.newsForm.controls['author'].setValue('AI');
    fixture.detectChanges();
    
    fixture.whenStable().then(() => {
      let input = fixture.debugElement.query(By.css('.author'));
      let el = input.nativeElement;

      expect(el.value).toBe('AI');
    });
  }));
});
