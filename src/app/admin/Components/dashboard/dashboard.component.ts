import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(private userService:UserService,private recipeService:RecipeService) {}

  recipes:Recipe[]=[];
  users:User[]=[];

  getRecipeList(){
    this.recipeService.getAllRecipes().subscribe((data:any)=>{
      console.log(data);
      this.recipes=data;
    })
  }

  getUserList(){
    this.userService.getAllUsers().subscribe((data:any)=>{
      console.log(data);
      this.users=data;
    })
  }
ngOnInit():void{
  this.getRecipeList();
  this.getUserList();

}
}
