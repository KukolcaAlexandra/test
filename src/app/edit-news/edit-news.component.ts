import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit {

  public newsId: string;
  title = 'Add';

  constructor(public route: ActivatedRoute) { }

  ngOnInit() {
    this.newsId = this.route.snapshot.params.id;
    if (this.newsId) {
      this.title = 'Edit';
    }
  }

}
