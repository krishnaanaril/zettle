import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb/dist/pouchdb';
// Mine
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class PouchService {

  db: any;
  remotedb: any;

  constructor() {
    this.db = new PouchDB('zettle');
    this.remotedb = new PouchDB('http://localhost:5984/zettledb');
  }

  logDBInfo() {
    this.db.info().then((info) => {
      console.log(info);
    });
  }

  addUser(user: User) {
    console.log('in add user.');
    this.db.put(user);
    this.syncWithRemote();
  }

  syncWithRemote() {
    console.log('in sync with remote');
    this.db.sync(this.remotedb);
  }
}
