import { Component } from '@angular/core';
import { User } from '../../../user/Models/user';
import { UserService } from '../../../user/Services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  constructor(private userService:UserService) {}


  users:User[]=[];



  getUserList(){
    this.userService.getAllUsers().subscribe((data:any)=>{
      console.log(data);
      this.users=data;
    })
  }
deleteUser(id:string){
  console.log("delete");
  
  this.userService.deleteUser(id).subscribe((data:any)=>{
    console.log(data);
    this.getUserList();
  })
}
ngOnInit():void{
  this.getUserList();

}
}
