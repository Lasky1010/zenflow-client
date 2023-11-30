import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackbar:MatSnackBar) { }

  showMessage(message:string){
    this.snackbar.open(message,undefined,{
      announcementMessage:message,
      duration:2000
    });
  }
}
