import { Component } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import { SnackbarService } from '../../Services/snackbar.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
  constructor(private userService:UserService,private snackService:SnackbarService,private fb:FormBuilder,private router:Router) {}  

  loginForm!:FormGroup;
  login(){
    this.userService.login(this.loginForm.value).subscribe((data:any)=>{
      try{
        this.userService.getUserCookie().subscribe((data:any)=>{
          console.log("got cookie"+data);
          this.router.navigate(['/home']);
          this.snackService.snackbarnotification(`Welcome ${data.user.name}`,"Dismiss",'success');
        })
      }
      catch(error){
        console.log(error);
        this.router.navigate(['/home']);
        this.snackService.snackbarnotification("Something Went Wrong","Dismiss",'error');
      }
    },
    (error)=>{
      console.log(error);
    })
  }
  logout(){
    this.userService.logout().subscribe((data:any)=>{
      console.log("log out successfull");
      
    });
  }
  ngOnInit():void{
    this.loginForm=this.fb.group({
      email:[''],
      password:['']
    })
    //this.logout();
    
  }
}
