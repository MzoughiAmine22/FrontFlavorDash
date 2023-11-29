import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../Services/recipe.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../../Models/recipe';
import { CookListService } from '../../Services/cook-list.service';
import { UserService } from '../../Services/user.service';
import { SnackbarService } from '../../Services/snackbar.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
})
export class RecipeDetailsComponent implements OnInit {
  [x: string]: any;
  recipe!: Recipe;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private cookListeService: CookListService,
    private userService: UserService,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService
  ) {}

  addToCookList(recId: string) {
    this.userService.getUserCookie().subscribe((data: any) => {
      this.cookListeService
        .addRecipeToCooklist(recId, data.token)
        .subscribe((data: any) => {
          console.log(data);
          this.snackbarService.snackbarnotification(
            'Added to CookList',
            'Dismiss',
            'success'
          );
        },(error:HttpErrorResponse)=>{
          this.snackbarService.snackbarnotification(
            'Something Went Wrong',
            'Dismiss',
            'error'
          );
        });
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    if (id) {
      this.recipeService.getRecipeDetails(id).subscribe((recipe: Recipe) => {
        this.recipe = recipe;
      });
    }
    window.scroll(0, 0);
  }
}
