import { Component } from '@angular/core';
import { Recipe } from '../../Models/recipe';
import { RecipeService } from '../../Services/recipe.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
 
  recipes:Recipe[]=[]
  filteredRecipes:Recipe[]=[];
  constructor(private recipeService:RecipeService){
   
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

  ngOnInit():void{
    this.getAllRecipes();

  }
}
