import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { MatBottomSheetRef } from '@angular/material';
// Mine
import { User } from '../shared/models/user';
import { LocalforageService } from '../shared/services/localforage.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  fileInputPlaceHolder: string;
  user: User;

  constructor(private location: Location
    , private localforage: LocalforageService
    , public snackBar: MatSnackBar
    , private bottomSheetRef: MatBottomSheetRef<AddUserComponent>) { }

  ngOnInit() {
    this.fileInputPlaceHolder = 'Choose an image';
    this.user = new User();
    console.log(this.user);
  }

  fileChanged(e) {
    if (e.srcElement.files.length > 0) {
      this.fileInputPlaceHolder = e.srcElement.files[0].name;
    }
  }

  cancelClick(event: MouseEvent) {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  onSubmit(event: MouseEvent) {
    console.log('form submitted.');
    console.log(this.user);
    this.localforage.addUser(this.user).subscribe((res) => {
      const snackBarRef = this.snackBar.open('User added.', 'UNDO', {
        duration: 2000,
        panelClass: ['snack-bar']
      });
      snackBarRef.onAction().subscribe(() => {
        this.localforage.removeUser(this.user.id).subscribe((result) => {
          this.snackBar.open(`${this.user.userName} removed.`, '', {
            duration: 2000,
            panelClass: ['snack-bar']
          });
        }, (err) => {
          console.error(err);
        });
      });
    },
      (err) => {
        console.error(err);
      },
      () => {
        this.bottomSheetRef.dismiss();
        event.preventDefault();
      });
  }
}
