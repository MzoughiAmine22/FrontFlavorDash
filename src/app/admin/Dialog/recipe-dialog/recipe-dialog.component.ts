import { Component, Inject } from '@angular/core';
import { Recipe } from '../../../user/Models/recipe';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-recipe-dialog',
  templateUrl: './recipe-dialog.component.html',
  styleUrl: './recipe-dialog.component.scss',
})
export class RecipeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<RecipeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Recipe
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  addIngredient(arg0: string) {
    throw new Error('Method not implemented.');
  }
  removeIngredient(_t20: number) {
    throw new Error('Method not implemented.');
  }
  addInstruction(arg0: string) {
    throw new Error('Method not implemented.');
  }
  removeInstruction(_t34: number) {
    throw new Error('Method not implemented.');
  }
}
