import { Component } from '@angular/core';
import { RecipeService } from '../../Services/recipe.service';
import { Recipe } from '../../Models/recipe';
import { UserService } from '../../Services/user.service';
import { CookListService } from '../../Services/cook-list.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
})
export class RecipesComponent {
  activeMealType = '';
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  constructor(
    private recipeService: RecipeService,
    private userService: UserService,
    private cookListeService: CookListService
  ) {}

  filterRecipes(criteria: string) {
    if (criteria === 'mealType=All') {
      this.activeMealType = criteria;
      this.filteredRecipes = this.recipes;
    } else {
      console.log('executing filter');
      this.activeMealType = criteria;
      this.recipeService
        .getRecipeByCriteria(criteria)
        .subscribe((recipes: Recipe[]) => {
          this.filteredRecipes = recipes;
          console.log(recipes);
        });
    }
  }
  addToCookList(recId: string) {
    this.userService.getUserCookie().subscribe((data: any) => {
      this.cookListeService
        .addRecipeToCooklist(recId, data.token)
        .subscribe((data: any) => {
          console.log(data);
        });
    });
  }
  getAllRecipes() {
    this.recipeService.getAllRecipes().subscribe((recipes: Recipe[]) => {
      this.filteredRecipes = recipes;
      this.recipes = recipes;
    });
  }

  ngOnInit(): void {
    this.getAllRecipes();
  }
}
