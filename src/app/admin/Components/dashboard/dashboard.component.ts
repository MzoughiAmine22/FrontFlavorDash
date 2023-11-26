import { Component } from '@angular/core';
import { UserService } from '../../../user/Services/user.service';
import { User } from '../../../user/Models/user';
import { Recipe } from '../../../user/Models/recipe';
import { RecipeService } from '../../../user/Services/recipe.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(private userSerice:UserService,private recipeService:RecipeService){}
  users:User[]=[];
  recipes:Recipe[]=[];
  getAllUsers()
  {
    this.userSerice.getAllUsers().subscribe((data:any)=>{
      console.log(data);
      this.users=data;
    })
  }

  getAllRecipes()
  {
    this.recipeService.getAllRecipes().subscribe((data:any)=>{
      console.log(data);
      this.recipes=data;
    })
  }

  ngOnInit():void{
    this.getAllUsers();
    this.getAllRecipes();
  }
}
