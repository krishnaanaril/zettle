import { Component, OnInit } from '@angular/core';
// Mine
import { User } from '../shared/models/user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  user: User;

  constructor() { }

  ngOnInit() {
    this.user = new User();
    console.log(this.user);
  }

  onLoginClick() {
    console.log('login click');
  }

}
