import { Component } from '@angular/core';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  constructor(private userService:UserService){
    
  }

  getUsers(){
    this.userService.getAllUsers().subscribe(
      (data)=>{
        console.log(data);
      }
    )
  }

  ngOnInit(): void {
    this.getUsers();
  }

}
