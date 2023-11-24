import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../Services/recipe.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../Models/recipe';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
})
export class RecipeDetailsComponent implements OnInit {
  recipe!: Recipe;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    if (id) {
      this.recipeService.getRecipeDetails(id).subscribe((recipe: Recipe) => {
        this.recipe = recipe;
      });
    }
  }
}
