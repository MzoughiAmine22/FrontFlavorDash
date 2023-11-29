import { Component } from '@angular/core';
import { User } from '../../../user/Models/user';
import { UserService } from '../../../user/Services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../Dialog/confirmation-dialog/confirmation-dialog.component';
import { SnackbarService } from '../../../user/Services/snackbar.service';
import { error } from 'console';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  constructor(private userService:UserService,private dialog:MatDialog,private snackBar:SnackbarService) {}


  users:User[]=[];



  getUserList(){
    this.userService.getAllUsers().subscribe((data:any)=>{
      console.log(data);
      this.users=data;
    })
  }
deleteUser(id:string){
  console.log("delete");
  const dialogRef=this.dialog.open(ConfirmationDialogComponent,{width:"400px",height:"auto"});
  dialogRef.afterClosed().subscribe((accept)=>{
    if(!accept)
    {
      return false;
    }
    else
    {
      this.userService.deleteUser(id).subscribe((data:any)=>{
        console.log(data);
        this.snackBar.snackbarnotification("User Deleted Successfully","Dismiss",'success');
        this.getUserList();
      })
      return true;
    }
  },(error=>{
    this.snackBar.snackbarnotification("Something Went Wrong","Dismiss",'error');
  }))
  
}
ngOnInit():void{
  this.getUserList();

}
}
