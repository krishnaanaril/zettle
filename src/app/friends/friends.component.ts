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
  defaultDisplayImagePath: string;

  constructor(private router: Router
    , private localforage: LocalforageService
    , private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.reloadList();
    this.defaultDisplayImagePath = 'assets/images/others/user.png';
  }

  reloadList() {
    this.localforage.getAllFriends()
      .then((res) => {
        this.friends = res;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  addUserClick() {
    // this.router.navigateByUrl('/add-user');
    this.bottomSheet.open(AddUserComponent).afterDismissed().subscribe(() => {
      this.reloadList();
    });
  }

  userEditClick(userId: string) {
    this.bottomSheet.open(AddUserComponent, { data: { userId: userId } }).afterDismissed().subscribe(() => {
      this.reloadList();
    });
  }

  userSettleClick(userId: string) {
    this.localforage.getUser(userId)
      .then((res) => {
        res.owe = 0;
        res.lent = 0;
        res.share = 0;
        this.localforage.addUser(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        this.reloadList();
      });
  }

  userDeleteClick(userId: string) {
    this.localforage.removeUser(userId);
    this.reloadList();
  }
}
