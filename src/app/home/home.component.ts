import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material';

// Mine
import { AddBillsComponent } from '../add-bills/add-bills.component';
import { LocalforageService } from '../shared/services/localforage.service';
import { Bill } from '../shared/models/bill';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  bills: Bill[];

  constructor(private localforage: LocalforageService
    , private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.reloadList();
  }

  reloadList() {
    this.bills = this.localforage.getAllBills();
  }

  addBillClick() {
    this.bottomSheet.open(AddBillsComponent).afterDismissed().subscribe(() => {
      this.reloadList();
    });
  }

  billEditClick(billId: string) {
    console.log(billId);
    this.bottomSheet.open(AddBillsComponent, { data: { billId: billId } }).afterDismissed().subscribe(() => {
      this.reloadList();
    });
  }

  billDeleteClick(billId: string) {
    this.localforage.getBill(billId)
      .then((res) => {
        this.localforage.rollBackUserSplit(res.userSplits);
      })
      .catch((err) => {
        console.error(err);
      });
    this.localforage.removeBill(billId);
    this.reloadList();
  }

}
