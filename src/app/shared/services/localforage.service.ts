import { Injectable } from '@angular/core';
import localforage from 'localforage';
import { Observable, of, from } from 'rxjs';

// Mine
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class LocalforageService {

  friendsStore: any;
  groupsStore: any;
  billsStore: any;
  metaStore: any;

  private _userCount: number;
  private _groupCount: number;

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
    this.metaStore = localforage.createInstance({
      name: 'zettle',
      storeName: 'metaStore',
      version: 1.0
    });
  }

  getStore(store: string): any {
    switch (store) {
      case 'friendStore':
        return this.friendsStore;
      case 'groupsStore':
        return this.groupsStore;
      case 'billsStore':
        return this.billsStore;
      case 'metaStore':
        return this.metaStore;
    }
  }

  addItem(store: string, key: string, value: any): Observable<boolean> {
    return this.getStore(store).setItem(key, value).then(() => {
      return of(true);
    }).catch((err) => {
      throw err;
    });
  }

  getItem(store: string, key: string): Observable<any> {
    return this.getStore(store).getItem(key).then((val) => {
      return of(val);
    }).catch((err) => {
      throw err;
    });
  }

  removeItem(store: string, key: string): Observable<boolean> {
    return this.getStore(store).removeItem(key).then(() => {
      console.log('key cleared');
      return of(true);
    }).catch((err) => {
      throw err;
    });
  }

  addUser(user: User): Observable<boolean> {
    return from(this.friendsStore.setItem(user.id, user).then(() => {
      console.log(`${user.userName} added to local storage.`);
      return of(true);
    }).catch((err) => {
      throw err;
    }));
  }

  removeUser(userId: string): Observable<boolean> {
    return from(this.friendsStore.removeItem(userId).then(() => {
      return of(true);
    }).catch((err) => {
      throw err;
    }));
  }

  getAllFriends(): Observable<User[]> {
    let users: Array<User>;
    users = [];
    this.friendsStore.iterate((value, key, iterationNumber) => {
      users.push(value);
    }).then(() => {
      console.log('Iteration has completed');
    }).catch((err) => {
      console.error(err);
    });
    users.sort((n1, n2) => {
      if (n1 > n2) {
        return 1;
      }
      if (n1 < n2) {
        return -1;
      }
      return 0;
    });
    return of(users);
  }
}
