import { Component } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private userService:UserService ) {}

  cookie:any={"_id:":"","email":"","password":"","name":"","phone":0,"age":0};

  hidelogin:boolean=true;
  hideprofile:boolean=false;


  
  getUserCookie()
  {
    this.userService.getUserCookie().subscribe((data:any)=>{
      if(data!=null)
      { 
        this.hidelogin=false;
        this.hideprofile=true;
        this.cookie=data;
        console.log(data);
        
      }
    },
    (err:HttpErrorResponse)=>{
      this.hidelogin=true;
      this.hideprofile=false;
      console.log(err);
      
    })
  }
  logout()
  {
    this.userService.logout().subscribe(()=>{});
    this.hidelogin=true;
    this.hideprofile=false;
    window.location.reload();

  }
  ngOnInit():void{
    this.getUserCookie();
  }
}
