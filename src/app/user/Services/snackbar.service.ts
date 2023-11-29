import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar:MatSnackBar) { }

  snackbarnotification(message:string,buttonTxt:string,messageType:'error'|'success')
  {
    this.snackBar.open(message,buttonTxt,{
      duration:3000,
      horizontalPosition:'center',
      verticalPosition:'bottom',
      panelClass:messageType
    });
  }
}
