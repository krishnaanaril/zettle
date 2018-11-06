import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
// Mine


@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    // this.pouchService.getUsers().subscribe((result) => {
    //   result.rows.forEach(element => {
    //     console.log(element.doc.email);
    //   });
    // }, (error) => {
    //   console.error(error);
    // });
  }

  addUserClick() {
    this.router.navigateByUrl('/add-user');
  }
}
