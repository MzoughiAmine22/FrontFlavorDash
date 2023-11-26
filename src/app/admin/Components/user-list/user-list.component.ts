import { Component } from '@angular/core';
import { User } from '../../../user/Models/user';
import { UserService } from '../../../user/Services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  constructor(private userSerice:UserService){}
  users:User[]=[];
  getAllUsers()
  {
    this.userSerice.getAllUsers().subscribe((data:any)=>{
      console.log(data);
      this.users=data;
    })
  }

  

  ngOnInit():void{
    this.getAllUsers();
  
  }
}
