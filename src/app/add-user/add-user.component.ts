import { Component, Inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { map } from 'rxjs/operators';
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
  isEdit: boolean;
  previousUserValue: User;

  constructor(private location: Location
    , private localforage: LocalforageService
    , public snackBar: MatSnackBar
    , private bottomSheetRef: MatBottomSheetRef<AddUserComponent>
    , @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {

    this.user = new User();
    this.previousUserValue = new User();

  }

  ngOnInit() {
    this.fileInputPlaceHolder = 'Choose an image';
    if (this.data && this.data.userId) {
      this.isEdit = true;
      this.localforage.getUser(this.data.userId).pipe(map((res: any) => {
        return res.value;
      })).subscribe((res) => {
        this.user = res;
        this.previousUserValue = Object.assign({}, this.user);
      }, (err) => {
        throw err;
      });
    }
    console.log(this.user);
  }

  fileChanged(e) {
    if (e.srcElement.files.length > 0) {
      this.fileInputPlaceHolder = e.srcElement.files[0].name;
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(e.srcElement.files[0]);
      reader.onload = () => {
        this.user.displayImage = <string>reader.result;
      };
      reader.onerror = (err) => {
        throw err;
      };
    }
  }

  cancelClick(event: MouseEvent) {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  onSubmit(event: MouseEvent) {
    console.log('form submitted.');
    console.log(this.user);
    let message: string;
    if (this.isEdit) {
      message = 'User details updated.';
    } else {
      message = 'User added.';
    }
    this.localforage.addUser(this.user).subscribe((res) => {
      const snackBarRef = this.snackBar.open(message, '', {
        duration: 2000,
        panelClass: ['snack-bar']
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
