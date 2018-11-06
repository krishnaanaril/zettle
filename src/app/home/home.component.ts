import { Component, OnInit, ViewChild } from '@angular/core';

// Mine


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor() { }

  ngOnInit() {
    // this.pouchService.logDBInfo();
  }

}
