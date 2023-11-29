import { Component } from '@angular/core';
import { AdminService } from '../../Services/admin.service';
import { SnackbarService } from '../../../user/Services/snackbar.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
  constructor(private adminService:AdminService,private snackService:SnackbarService,private fb:FormBuilder,private router:Router) {
    
  }  

  loginForm!:FormGroup;

  login(){
    this.adminService.login(this.loginForm.value).subscribe((data:any)=>{
      try{
        this.adminService.getAdminCookie().subscribe((data:any)=>{
          console.log("got cookie"+data);
          this.router.navigate(['/admin']);
          this.snackService.snackbarnotification(`Welcome ${data.admin.name}`,"Dismiss",'success');

        })
      }
      catch(error){

        console.log(error);
        this.snackService.snackbarnotification("Something Went Wrong","Dismiss",'error');

      }
    },
    (error)=>{
      console.log(error);
    })
  }
  logout(){
    this.adminService.logout().subscribe((data:any)=>{
      
      console.log("log out successfull");
      
    });
  }
  ngOnInit():void{

    this.logout();

    this.loginForm=this.fb.group({
      email:[''],
      password:['']
    })
    
    
    
  }
}
