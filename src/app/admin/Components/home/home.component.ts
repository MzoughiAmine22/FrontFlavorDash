import { Component } from '@angular/core';
import { AdminService } from '../../Services/admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  admincookie!:any;
  constructor(private adminService:AdminService,private router:Router ){
    this.adminService.getAdminCookie().subscribe((data:any)=>{
      this.admincookie=data;
    },(err:HttpErrorResponse)=>{
      this.router.navigate(['/adminlogin']);
    })
  }

  logout(){
    this.adminService.logout().subscribe((data:any)=>{
      console.log("log out successfull");
      this.router.navigate(['/adminlogin']);
    });
  }
  
}

