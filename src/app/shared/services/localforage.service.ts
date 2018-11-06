import { Injectable } from '@angular/core';
import localforage from 'localforage';
// Mine
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LocalforageService {

  friendsStore: any;
  groupsStore: any;
  billsStore: any;

  constructor() {
    this.friendsStore = localforage.createInstance({
      name: 'zettle',
      storeName: 'friendsStore',
      version: 1.0
    });
    this.groupsStore = localforage.createInstance({
      name: 'zettle',
      storeName: 'groupsStore',
      version: 1.0
    });
    this.billsStore = localforage.createInstance({
      name: 'zettle',
      storeName: 'billsStore',
      version: 1.0
    });
  }

  addUser(user: User) {
    this.friendsStore.setItem(user._id, user).then(() => {
      console.log(`${user.userName} added to local storage.`);
    }).catch((err) => {
      console.error(err);
    });
  }
}
