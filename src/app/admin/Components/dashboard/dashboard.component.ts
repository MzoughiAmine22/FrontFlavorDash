import { Component } from '@angular/core';
import { Recipe } from '../../../user/Models/recipe';
import { User } from '../../../user/Models/user';
import { RecipeService } from '../../../user/Services/recipe.service';
import { UserService } from '../../../user/Services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(
    private userService: UserService,
    private recipeService: RecipeService
  ) {}

  recipes: Recipe[] = [];
  users: User[] = [];

  getRecipeList() {
    this.recipeService.getAllRecipes().subscribe((data: any) => {
      console.log(data);
      this.recipes = data;
    });
  }

  getUserList() {
    this.userService.getAllUsers().subscribe((data: any) => {
      console.log(data);
      this.users = data;
    });
  }
  ngOnInit(): void {
    this.getRecipeList();
    this.getUserList();
  }
}
