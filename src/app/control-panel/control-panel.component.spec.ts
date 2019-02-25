import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ControlPanelComponent } from './control-panel.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NewsService } from '../news.service';
import { NewsServiceMock } from '../news-service-mock';

describe('ControlPanelComponent', () => {
  let component: ControlPanelComponent;
  let fixture: ComponentFixture<ControlPanelComponent>;
  let sourceEl: DebugElement;
  const expectedSource = 'bbc';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
      declarations: [
        ControlPanelComponent
      ],
      providers: [
        { provide: NewsService, useClass: NewsServiceMock }
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(ControlPanelComponent);
      component = fixture.componentInstance;
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sources be undefined', async(() => {
    expect(component.sources).toBeUndefined();
  }));

  it('should have sources list', async(() => {
    fixture.detectChanges();
    expect(component.sources.length).toEqual(5);
  }));

  it('should have disabled comboBox', async(() => {
    component.onCheckMyNews(true);
    fixture.detectChanges();
    expect(component.comboBox.disabled).toBeTruthy();
  }));

  it('should have enabled comboBox', async(() => {
    component.onCheckMyNews(false);
    fixture.detectChanges();
    expect(component.comboBox.disabled).toBeFalsy();
  }));

  it('should emit on filter click', () => {
    spyOn(component.filterNews, 'emit');
    // trigger the click
    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('.filter');
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(component.filterNews.emit).toHaveBeenCalled();
 });

 it('should emit onCheckBox click', () => {
  spyOn(component.updateCount, 'emit');
  component.onCheckMyNews(true);
  fixture.detectChanges();
  expect(component.updateCount.emit).toHaveBeenCalled();
});

it('should not emit onCheckBox click', () => {
  spyOn(component.updateCount, 'emit');
  component.onCheckMyNews(false);
  fixture.detectChanges();
  expect(component.updateCount.emit).not.toHaveBeenCalled();
});

});
