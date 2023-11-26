import { Component } from '@angular/core';
import { Recipe } from '../../../user/Models/recipe';
import { RecipeService } from '../../../user/Services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent {
  constructor(private recipeService:RecipeService) {}

  recipes:Recipe[]=[];


  getRecipeList(){
    this.recipeService.getAllRecipes().subscribe((data:any)=>{
      console.log(data);
      this.recipes=data;
    })
  }

deleteRecipe(id:string){
  this.recipeService.deleteRecipe(id).subscribe((data:any)=>{
    console.log(data);
    this.getRecipeList();
  })
}

ngOnInit():void{
  this.getRecipeList();
 

}
}
