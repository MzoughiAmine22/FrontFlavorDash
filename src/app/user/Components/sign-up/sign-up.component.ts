import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { SnackbarService } from '../../Services/snackbar.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
constructor(private userService:UserService,private snackService:SnackbarService,private fb:FormBuilder,private router:Router ) {}

  signForm!:FormGroup;
  signup()
  {
    this.userService.signup(this.signForm.value).subscribe((data:any)=>{
      console.log(data);
      this.router.navigate(['/login']);
      this.snackService.snackbarnotification("Signup Successful","Dismiss",'success');

    },(error)=>{
      this.snackService.snackbarnotification("Something Went Wrong","Dismiss",'error');

    })
  }
  get email()
  {
    return this.signForm.get('email');
  }
  get password()
  {
    return this.signForm.get('password');
  }

  get phone()
  {
    return this.signForm.get('phone');
  }
  get name()
  {
    return this.signForm.get('name');
  }
  get age()
  {
    return this.signForm.get('age');
  }
  
ngOnInit():void{
  this.signForm=this.fb.group({
    email:['',[Validators.required,Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],
    password:['',Validators.required,Validators.minLength(8)],
    name:['',Validators.required],
    phone:['',[Validators.required,Validators.pattern(/^\d{2}-\d{3}-\d{3}$/)]],
    age:['',[Validators.required,Validators.min(13)]]
  })
}

}
