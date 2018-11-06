import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
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
    ,private localforage: LocalforageService) { }

  ngOnInit() {
    this.fileInputPlaceHolder = 'Choose an image';
    this.user = new User();
    console.log(this.user);
    // this.pouchService.syncWithRemote();
  }

  fileChanged(e) {
    if (e.srcElement.files.length > 0) {
      this.fileInputPlaceHolder = e.srcElement.files[0].name;
    }
  }

  cancelClick() {
    this.location.back();
  }

  onSubmit() {
    console.log('form submitted.');
    console.log(this.user);
    this.localforage.addUser(this.user);
  }
}
