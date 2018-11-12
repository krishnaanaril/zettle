import { Injectable } from '@angular/core';
import localforage from 'localforage';
import { Observable, of, from } from 'rxjs';

// Mine
import { User } from '../models/user';
import { Bill } from '../models/bill';
import { count } from 'rxjs/operators';


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

  addUser(user: User): Observable<boolean> {
    return from(this.friendsStore.setItem(user.id, user).then(() => {
      console.log(`${user.userName} added to local storage.`);
      return of(true);
    }).catch((err) => {
      throw err;
    }));
  }

  getUser(userId: string): Observable<User> {
    return from(this.friendsStore.getItem(userId).then((res) => {
      return of(res);
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

  getBillCount(): Observable<number> {
    return from(this.metaStore.getItem('billCount').then((res) => {
      return of(res);
    }).catch((err) => {
      throw err;
    }));
  }

  setBillCount(billCount: number): Observable<boolean> {
    return from(this.metaStore.setItem('billCount', billCount).then(() => {
      console.log(`Bill count added to local storage.`);
      return of(true);
    }).catch((err) => {
      throw err;
    }));
  }

  addBill(bill: Bill): Observable<boolean> {
    return from(this.billsStore.setItem(bill.id, bill).then(() => {
      console.log(`${bill.description} added to local storage.`);
      return of(true);
    }).catch((err) => {
      throw err;
    }));
  }

  getBill(billId: string): Observable<Bill> {
    return from(this.billsStore.getItem(billId).then((res) => {
      return of(res);
    }).catch((err) => {
      throw err;
    }));
  }

  rollBackUserWithBill(bill: Bill): Observable<boolean> {
    const share = bill.expense / bill.users.length;
    bill.users.forEach((user) => {
      this.friendsStore.getItem(user).then((res: User) => {
        if (res.id === bill.lenter.id) {
          res.lent -= bill.expense;
        }
        res.share -= share;
        res.owe = res.share - res.lent;
        this.friendsStore.setItem(user, res);
      }).catch((err) => {
        throw err;
      });
    });
    return of(true);
  }

  updateUserWithBill(bill: Bill): Observable<boolean> {
    const share = bill.expense / bill.users.length;
    bill.users.forEach((user) => {
      this.friendsStore.getItem(user).then((res: User) => {
        if (res.id === bill.lenter.id) {
          res.lent += bill.expense;
        }
        res.share += share;
        res.owe = res.share - res.lent;
        this.friendsStore.setItem(user, res);
      }).catch((err) => {
        throw err;
      });
    });
    return of(true);
  }

  removeBill(billId: string): Observable<boolean> {
    return from(this.billsStore.removeItem(billId).then(() => {
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
      console.log('Iteration has completed fr');
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

  getAllBills(): Observable<Bill[]> {
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
    return of(bills);
  }
}
