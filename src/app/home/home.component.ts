import { Component, OnInit, ViewChild } from '@angular/core';

// Mine
import { PouchService } from '../shared/services/pouch.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  

  constructor(private pouchService: PouchService) { }

  ngOnInit() {
    this.pouchService.logDBInfo();
  }
  
}
