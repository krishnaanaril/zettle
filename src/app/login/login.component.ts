import { Component, OnInit } from '@angular/core';
import { trigger, style, state, transition, animate } from '@angular/animations';
// Mine
// import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('hover', [
      state('enter', style({
        backgroundColor: 'gold'
      })),
      state('leave', style({
        backgroundColor: 'black'
      })),
      transition('enter => leave', [
        style({
          backgroundColor: 'green'
        }),
        animate('2s')
      ]),
      transition('leave => enter', [
        animate('0.1s')
      ]),
    ])
  ]
})
export class LoginComponent implements OnInit {

  isHover: boolean;

  constructor() { }

  ngOnInit() {
    this.isHover = false;
  }

  mouseEnter() {
    this.isHover = true;
  }

  mouseLeave() {
    this.isHover = false;
  }

}
