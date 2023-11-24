import { Component } from '@angular/core';
import { RecipeService } from '../../Services/recipe.service';
import { Recipe } from '../../Models/recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipesComponent {
  activeMealType = '';
  recipes:Recipe[]=[]
  filteredRecipes:Recipe[]=[];
  constructor(private recipeService:RecipeService){
   
  }


  filterRecipes(criteria:string){
    if(criteria==="mealType=All"){
      this.activeMealType = criteria;
      this.filteredRecipes=this.recipes;
    }
    else{
      console.log("executing filter");
      this.activeMealType = criteria;
      this.recipeService.getRecipeByCriteria(criteria).subscribe((recipes:Recipe[])=>{
        this.filteredRecipes=recipes;
        console.log(recipes);
      })
    }
    
  }

  getAllRecipes(){
    this.recipeService.getAllRecipes().subscribe((recipes:Recipe[])=>{
      this.filteredRecipes=recipes;
      this.recipes=recipes;
    })
  }

  ngOnInit():void{
    this.getAllRecipes();

  }
}
