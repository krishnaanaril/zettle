import { Component, OnInit } from '@angular/core';
// Mine
import { User } from '../shared/models/user';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  user: User;

  constructor() { }

  ngOnInit() {
    this.user = new User();
    console.log(this.user);
  }

  onSignUpClick() {}

}
