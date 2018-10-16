import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  Url = 'http://demo6915178.mockable.io';
  constructor(private http: HttpClient) {}

  getUserList() {
    return this.http.get(this.Url + '/user');
  }


  getArticle() {
    return this.http.get(this.Url + '/article');
  }

}
