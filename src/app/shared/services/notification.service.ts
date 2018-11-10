import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

// Mine

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar) { }

  dispalySnackBar(message: string, action: string, actionMethod: Function) {

  }
}
