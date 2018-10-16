import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  public Editor = ClassicEditor;
  articles = [];
  constructor(
    private _appService: AppService,
    private _activatedRoute: ActivatedRoute
  ) {}
  userId;
  selectedArticle;
  routerSubscription: Subscription;

  public model = {
    editorData: ''
  };

  ngOnInit() {
    const articlePresent = JSON.parse(localStorage.getItem('articles'));
    if (articlePresent && articlePresent.length > 0) {
      this.articles = articlePresent;
    } else {
      this.getArticle();
    }
    this.routerSubscription = this._activatedRoute.params.subscribe(params => {
      this.userId = params['id'];
    });
  }

  getArticle() {
    this._appService.getArticle().subscribe(
      response => {
        this.articles = response['article'];
        localStorage.setItem('articles', JSON.stringify(this.articles));
        console.log(this.articles);
      },
      error => {
        console.log('error: ', error);
      }
    );
  }

  edit(article: any) {
    this.selectedArticle = article;
    this.model.editorData = article.content;
  }

  save() {
    this.selectedArticle.content = this.model.editorData;
  }
}
