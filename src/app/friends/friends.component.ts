import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatBottomSheet } from '@angular/material';

// Mine
import { AddUserComponent } from '../add-user/add-user.component';
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
    , private localforage: LocalforageService
    , private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.localforage.getAllFriends().subscribe((res) => {
      this.friends = res;
    }, (err) => {
      console.error(err);
    });
  }

  addUserClick() {
    // this.router.navigateByUrl('/add-user');
    this.bottomSheet.open(AddUserComponent);
  }

  userDeleteClick(userId: string) {
    this.localforage.removeUser(userId).subscribe((res) => {
      console.log(`${userId} removed.`);
    }, (err) => {
      console.error(err);
    });
  }
}
