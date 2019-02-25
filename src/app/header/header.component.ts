import { Component, OnInit, Input } from '@angular/core';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() sourceName: string = 'SourceName';

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.updatedSourceName.subscribe((sourceName: string) => {
      this.sourceName = sourceName;
    });
  }

  logIn() {
    this.newsService.logIn();
  }

}
