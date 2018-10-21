import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb/dist/pouchdb';

@Injectable({
  providedIn: 'root'
})

export class PouchService {

  db: any;

  constructor() {
    this.db = new PouchDB('zettle');
  }

  logDBInfo() {
    this.db.info().then((info) => {
      console.log(info);
    });
  }
}
