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
    this.localforageService.getAllFriends().subscribe((result) => {
      this.allUsers = result;
      console.log(result);
      console.log(this.allUsers);
      if (this.data && this.data.billId) {
        this.localforageService.getBill(this.data.billId).subscribe((res: any) => {
          this.bill = res.value;
          this.previousBill = Object.assign({}, this.bill);
          this.lenters = this.allUsers.filter((user) => {
            return this.bill.users.findIndex(mem => user.id === mem) > -1;
          });
          this.bill = res.value;
          console.log(this.lenters);
        }, (err) => {
          console.error(err);
        });
      }
    }, (err) => {
      console.error(err);
    });
    // const categories$ = this.dataService.getCategories();
    // const allUsers$ = this.localforageService.getAllFriends();
    // forkJoin(categories$, allUsers$).subscribe((result) => {
    //   this.categories = <Category[]>result[0];
    //   this.allUsers = result[1];
    //   console.log(`all users: ${result[1].length}`);
    //   if (this.data && this.data.billId) {
    //     this.isEdit = true;
    //     this.localforageService.getBill(this.data.billId).subscribe((res: any) => {
    //       this.bill = res.value;
    //       this.previousBill = Object.assign({}, this.bill);
    //     }, (err) => {
    //       console.error(err);
    //     });
    //   }
    // }, (err) => {
    //   console.error(err);
    // });
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

  rollback() {
    const share = this.previousBill.expense / this.previousBill.users.length;
    this.bill.users.forEach((userId) => {
      this.localforageService.getUser(userId).subscribe((user: any) => {
        if (user.id === this.bill.lenter.id) {
          user.lent -= this.bill.expense;
        }
        user.share -= share;
        user.owe = user.share - user.lent;
        this.localforageService.addUser(user).subscribe((res) => {
          console.log(`${user.id} updated`);
        }, (err) => {
          console.log(err);
        });
      }, (err) => {
        console.error(err);
      });
    });
  }

  onSubmit(event: MouseEvent) {
    if (this.bill.createdDate === null) {
      this.bill.createdDate = new Date();
    }
    if (this.isEdit) {
      this.localforageService.rollBackUserWithBill(this.bill).subscribe((res) => {
        this.localforageService.updateUserWithBill(this.bill);
      });
    } else {
      this.localforageService.updateUserWithBill(this.bill);
    }

    this.localforageService.getBillCount().pipe(
      mergeMap((res: any) => {
        let billCount: number;
        if (!res.value) {
          billCount = 1;
        } else {
          billCount = res.value;
        }
        this.localforageService.setBillCount(billCount + 1).subscribe(() => { }, (err) => { });
        return of(billCount);
      })
    ).subscribe((billCount: number) => {
      this.bill.id = `Bill${billCount}`;
      this.localforageService.addBill(this.bill).subscribe((res) => {
        const snackBarRef = this.snackBar.open('Bill added.', '', {
          duration: 2000,
          panelClass: ['snack-bar']
        });
      }, (err) => {
        throw err;
      });
    }, (err) => {
      console.error(err);
    }, () => {
      this.bottomSheetRef.dismiss();
      event.preventDefault();
    });
  }

}
