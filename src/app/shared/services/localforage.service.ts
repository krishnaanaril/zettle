import { Injectable } from '@angular/core';
import localforage from 'localforage';
import { Observable, of, from } from 'rxjs';

// Mine
import { User } from '../models/user';
import { Bill } from '../models/bill';
import { UserSplit } from '../models/user-split';

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

  addUser(user: User): void {
    this.friendsStore.setItem(user.id, user).then(() => {
      console.log(`${user.userName} added to local storage.`);
    }).catch((err) => {
      throw err;
    });
  }

  getUser(userId: string): Promise<User> {
    return this.friendsStore.getItem(userId);
  }

  removeUser(userId: string): void {
    this.friendsStore.removeItem(userId).catch((err) => {
      throw err;
    });
  }

  getBillCount(): Promise<number> {
    return this.metaStore.getItem('billCount');
  }

  setBillCount(billCount: number): void {
    this.metaStore.setItem('billCount', billCount).catch((err) => {
      throw err;
    });
  }

  addBill(bill: Bill): void {
    this.billsStore.setItem(bill.id, bill).catch((err) => {
      throw err;
    });
  }

  getBill(billId: string): Promise<Bill> {
    return this.billsStore.getItem(billId);
  }

  
  /// Rollbacking old split
  rollBackUserSplit(splits: Array<UserSplit>): void {
    console.log(`in rollback user split: ${splits.length}`);
    splits.forEach((split) => {
      console.log(`rollback ids: ${split.userId}`);
      this.friendsStore.getItem(split.userId).then((res: User) => {
        res.lent -= split.lent;
        res.owe -= split.owe;
        res.share = res.share - res.lent;
        this.friendsStore.setItem(res.id, res);
      }).catch((err) => {
        throw err;
      });
    });
  }

  udpateUserSplit(splits: Array<UserSplit>): void {
    console.log(`in update user split: ${splits.length}`);
    splits.forEach((split) => {
      console.log(`update ids: ${split.userId}`);
      this.friendsStore.getItem(split.userId).then((res: User) => {
        res.lent += split.lent;
        res.owe += split.owe;
        res.share = res.share - res.lent;
        this.friendsStore.setItem(res.id, res);
      }).catch((err) => {
        throw err;
      });
    });
  }

  removeBill(billId: string): void {
    this.billsStore.removeItem(billId).catch((err) => {
      throw err;
    });
  }

  getAllFriends(): Promise<User[]> {
    let users: Array<User>;
    users = [];
    return this.friendsStore.iterate((value, key, iterationNumber) => {
      users.push(value);
    }).then(() => {
      console.log('Iteration has completed fr');
      users.sort((n1, n2) => {
        if (n1 > n2) {
          return 1;
        }
        if (n1 < n2) {
          return -1;
        }
        return 0;
      });
      return users;
    }).catch((err) => {
      console.error(err);
    });
  }

  getAllBills(): Bill[] {
    let bills: Array<Bill>;
    bills = [];
    this.billsStore.iterate((value, key, iterationNumber) => {
      bills.push(value);
    }).then(() => {
      console.log('Iteration has completed bill');
    }).catch((err) => {
      console.error(err);
    });
    bills.sort((n1, n2) => {
      if (n1.createdDate > n2.createdDate) {
        return 1;
      }
      if (n1.createdDate < n2.createdDate) {
        return -1;
      }
      return 0;
    });
    return bills;
  }
}
