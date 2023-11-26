import { Component } from '@angular/core';
import { RecipeService } from '../../../user/Services/recipe.service';
import { Recipe } from '../../../user/Models/recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent {
  constructor(private recipeService:RecipeService){}
 
  recipes:Recipe[]=[];
  

  getAllRecipes()
  {
    this.recipeService.getAllRecipes().subscribe((data:any)=>{
      console.log(data);
      this.recipes=data;
    })
  }

  ngOnInit():void{
    
    this.getAllRecipes();
  }

}
