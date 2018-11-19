import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { pipe, of, zip, combineLatest, forkJoin } from 'rxjs';
import { mergeMap, map, merge } from 'rxjs/operators';
// Mine
import { Category } from '../shared/models/category';
import { LocalforageService } from '../shared/services/localforage.service';
import { DataService } from '../shared/services/data.service';
import { Bill } from '../shared/models/bill';
import { User } from '../shared/models/user';
import { debug } from 'util';
import { UserSplit } from '../shared/models/user-split';

@Component({
  selector: 'app-add-bills',
  templateUrl: './add-bills.component.html',
  styleUrls: ['./add-bills.component.scss']
})
export class AddBillsComponent implements OnInit {

  categories: Array<Category>;
  bill: Bill;
  previousBill: Bill;
  allUsers: Array<User>;
  lenters: Array<User>;
  isEdit: boolean;

  constructor(private dataService: DataService
    , private localforageService: LocalforageService
    , public snackBar: MatSnackBar
    , private bottomSheetRef: MatBottomSheetRef<AddBillsComponent>
    , @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    this.bill = new Bill();
    this.previousBill = new Bill();
    this.lenters = [];
  }

  ngOnInit() {
    this.dataService.getCategories().subscribe((res: any) => {
      this.categories = res;
    }, (err) => {
      console.log(err);
    });
    this.localforageService.getAllFriends()
      .then((res) => {
        this.allUsers = res;
        if (this.data && this.data.billId) {
          this.isEdit = true;
          this.localforageService.getBill(this.data.billId)
            .then((result) => {
              this.lenters = this.allUsers.filter((user) => {
                return result.users.findIndex(mem => user.id === mem) > -1;
              });
              this.bill = result;
              this.previousBill = Object.assign({}, this.bill);
              console.log(this.bill);
              console.log(this.bill.lenter);
              console.log(this.allUsers.length);
              console.log(this.lenters);
            })
            .catch((err) => {
              console.error(err);
            });
        }
      })
      .catch((err) => {
        console.error(err);
      });

  }

  openedChange(event) {
    console.log('in openedchange');
    this.lenters = this.allUsers.filter((user) => {
      return this.bill.users.findIndex(mem => user.id === mem) > -1;
    });
  }

  userChange(event) {
    this.lenters = this.allUsers.filter((user) => {
      return this.bill.users.findIndex(mem => user.id === mem) > -1;
    });
  }

  cancelClick(event: MouseEvent) {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  getUserSplit(bill: Bill): any {
    const userSplits: Array<UserSplit> = [];
    const share = bill.expense / bill.users.length;
    const refs = [];
    bill.users.forEach((user) => {
      console.log(`Each user:${user}`);
      const ref = this.localforageService.getUser(user);
      // .then((res: User) => {
      //   const split: UserSplit = new UserSplit(user);
      //   split.userName = res.userName;
      //   if (split.userId === bill.lenter) {
      //     split.lent += bill.expense;
      //   }
      //   split.share += share;
      //   split.owe = split.share - split.lent;
      //   userSplits.push(split);
      // });
      refs.push(ref);
    });
    return Promise.all(refs);
  }

  onSubmit(event: MouseEvent) {
    if (this.bill.createdDate === null) {
      this.bill.createdDate = new Date();
    }
    // Rollback previous split on edit
    if (this.isEdit) {
      this.localforageService.rollBackUserSplit(this.bill.userSplits);
    }
    // this.bill.userSplits = this.getUserSplit(this.bill);
    this.bill.userSplits = [];
    const share = this.bill.expense / this.bill.users.length;
    this.getUserSplit(this.bill).then((results) => {
      results.forEach((user: User) => {
        const split: UserSplit = new UserSplit(user.id);
        split.userId = user.id;
        split.userName = user.userName;
        if (split.userId === this.bill.lenter) {
          split.lent += this.bill.expense;
        }
        split.share += share;
        split.owe = split.share - split.lent;
        this.bill.userSplits.push(split);
      });
      console.log(this.bill.userSplits);
      this.localforageService.udpateUserSplit(this.bill.userSplits);
      let billCount: number;
      if (this.isEdit) {
        this.localforageService.addBill(this.bill);
        const snackBarRef = this.snackBar.open('Bill updated.', '', {
          duration: 2000,
          panelClass: ['snack-bar']
        });
      } else {
        this.localforageService.getBillCount()
          .then((res) => {
            billCount = res;
            if (!billCount) {
              billCount = 1;
            }
            console.log(`Bill count : ${billCount}`);
            this.localforageService.setBillCount(billCount + 1);
            this.bill.id = `Bill${billCount}`;
            this.localforageService.addBill(this.bill);
            const snackBarRef = this.snackBar.open('Bill added.', '', {
              duration: 2000,
              panelClass: ['snack-bar']
            });
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
