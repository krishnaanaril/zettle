import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private displayHome: boolean;
  private displayFriends: boolean;
  private displayGroups: boolean;
  private displayAnalytics: boolean;

  @Input()
  set home(value: boolean) {
    this.displayHome = value || false;
  }
  get home() {
    return this.displayHome || false;
  }
  @Input()
  set friends(value: boolean) {
    this.displayFriends = value || false;
  }
  get friends() {
    return this.displayFriends || false;
  }
  @Input()
  set groups(value: boolean) {
    this.displayGroups = value || false;
  }
  get groups() {
    return this.displayGroups || false;
  }
  set analytics(value: boolean) {
    this.displayAnalytics = value || false;
  }
  get analytics() {
    return this.displayAnalytics || false;
  }

  constructor() { }

  ngOnInit() {
  }

}
