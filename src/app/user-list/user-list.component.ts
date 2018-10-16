import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: Array<any>;
  constructor(private _appService: AppService, private _router: Router) {
    this.users = [];
  }

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this._appService.getUserList().subscribe(
      response => {
        this.users = response['users'];
        console.log('this.users: ', this.users);
      },
      error => {
        console.log('error: ', error);
      }
    );
  }

  login(id:string){
    console.log('id: ', id);
   this._router.navigateByUrl('/article/' + id);

  }
}
