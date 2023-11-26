import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
constructor(private userService:UserService,private fb:FormBuilder,private router:Router ) {}

  signForm!:FormGroup;
  signup()
  {
    this.userService.signup(this.signForm.value).subscribe((data:any)=>{
      console.log(data);
      this.router.navigate(['/login']);
    })
  }

ngOnInit():void{
  this.signForm=this.fb.group({
    email:[''],
    password:[''],
    name:[''],
    phone:[],
    age:[]
  })
}

}
