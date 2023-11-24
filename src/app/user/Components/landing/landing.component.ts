import { Component } from '@angular/core';
import { Recipe } from '../../Models/recipe';
import { RecipeService } from '../../Services/recipe.service';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
 
  recipes:Recipe[]=[]
  filteredRecipes:Recipe[]=[];
  constructor(private recipeService:RecipeService,private userService:UserService){
   
  }


  filterRecipes(criteria:string){
    console.log("executing filter");
    this.recipeService.getRecipeByCriteria(criteria).subscribe((recipes:Recipe[])=>{
      this.filteredRecipes=recipes;
      
      
      console.log(recipes);
    })
  }

  getAllRecipes(){
    this.recipeService.getAllRecipes().subscribe((recipes:Recipe[])=>{
      this.recipes=recipes;
    })
  }

  logout()
  {
    this.userService.logout().subscribe((data:any)=>{
      console.log(data);
      
    });
  }  
  ngOnInit():void{
    this.getAllRecipes();

    

  }
}
