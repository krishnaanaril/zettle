import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
// Mine
import { LocalforageService } from '../shared/services/localforage.service';
import { User } from '../shared/models/user';
@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  friends: User[];

  constructor(private router: Router
    , private localforage: LocalforageService) { }

  ngOnInit() {
    this.localforage.getAllFriends().subscribe((res) => {
      this.friends = res;
    }, (err) => {
      console.error(err);
    });
  }

  addUserClick() {
    this.router.navigateByUrl('/add-user');
  }
}
