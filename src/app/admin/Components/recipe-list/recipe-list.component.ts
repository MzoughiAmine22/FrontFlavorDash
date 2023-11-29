import { Component } from '@angular/core';
import { Recipe } from '../../../user/Models/recipe';
import { RecipeService } from '../../../user/Services/recipe.service';
import { RecipeDialogComponent } from '../../Dialog/recipe-dialog/recipe-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '../../../user/Services/snackbar.service';
import { ConfirmationDialogComponent } from '../../Dialog/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss',
})
export class RecipeListComponent {
  constructor(private recipeService: RecipeService, public dialog: MatDialog,private snackBar:SnackbarService) {}

  recipes: Recipe[] = [];

  getAllRecipes() {
    this.recipeService.getAllRecipes().subscribe((data: any) => {
      this.recipes = data;
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(RecipeDialogComponent, {
      width: '50%',
      height: '80%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'save') {
        this.getAllRecipes();
      }
    });
  }

  openUpdateDialog(recipe: any): void {
    const dialogRef = this.dialog.open(RecipeDialogComponent, {
      width: '50%',
      height: '80%',
      data: recipe, // Pass a copy of the recipe data to avoid modifying the original
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'update') {
        this.getAllRecipes();
      }
    });
  }

  deleteRecipe(id: string) {
    const dialogRef=this.dialog.open(ConfirmationDialogComponent,{width:"400px",height:"auto"});
    dialogRef.afterClosed().subscribe((accept)=>{
      if(!accept)
      {
        return false;
      }
      else
      {
        this.recipeService.deleteRecipe(id).subscribe((data:any)=>{
          console.log(data);
          this.snackBar.snackbarnotification("Recipe Deleted Successfully","Dismiss",'success');
          this.getAllRecipes();
        })
        return true;
      }
    },(error=>{
      this.snackBar.snackbarnotification("Something Went Wrong","Dismiss",'error');
    }))
  }

  ngOnInit(): void {
    this.getAllRecipes();
  }
}
