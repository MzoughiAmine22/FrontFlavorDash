import { Component, Inject, OnInit } from '@angular/core';
import { Recipe } from '../../../user/Models/recipe';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Ingredient } from '../../../user/Models/ingredient';
import { IngredientService } from '../../../user/Services/ingredient.service';
import {AsyncPipe} from '@angular/common';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { RecipeService } from '../../../user/Services/recipe.service';
@Component({
  selector: 'app-recipe-dialog',
  templateUrl: './recipe-dialog.component.html',
  styleUrl: './recipe-dialog.component.scss',
})
export class RecipeDialogComponent implements OnInit {


  message:string="Add";
  buttonAction:string = "Save";
  recipeForm!:FormGroup;
  recipe!:Recipe;
  constructor(public dialogRef: MatDialogRef<RecipeDialogComponent>,@Inject(MAT_DIALOG_DATA) public editData: any,private fb:FormBuilder,private ingredientService:IngredientService,private recipeService:RecipeService) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  getAllIngredients(){
    this.ingredientService.getAllIngredients().subscribe((data:any)=>{
      console.log(data);
      this.allingredients=data;
    })
  }

  getRecipeById(id:string){
    this.ingredientService.getIngredientById(id).subscribe((data:any)=>{
      console.log(data);
      this.recipe=data;
    })
  }

  ingredient = new FormControl<string | Ingredient>('');
  allingredients: Ingredient[] = [];
  ingredientmesure: { ingredient: Ingredient, mesure: string }[] = [];
  filteredOptions!: Observable<Ingredient[]>;
  ingredientForm!:FormGroup;


  selectedNumbers: { number: number, description: string }[] = [];

  addStep(event: MouseEvent, number: number) {
    event.stopPropagation();
    this.selectedNumbers.push({ number, description: '' });
  }

  numbers: number[] = Array.from({length: 100}, (_, i) => i + 1);


 
  displayFn(ingredientn: Ingredient): string {
    return ingredientn && ingredientn.name ? ingredientn.name : '';
  }

  private _filter(name: string): Ingredient[] {
    const filterValue = name.toLowerCase();

    return this.allingredients.filter(option => option.name.toLowerCase().includes(filterValue));
  }



  selectedOptions: { ingredient: Ingredient, measure: string }[] = [];

  addOption(event: MatAutocompleteSelectedEvent) {
    const selectedIngredient = event.option.value;
    const alreadyExists = this.selectedOptions.some(option => option.ingredient.name === selectedIngredient.name);

    if (!alreadyExists) {
      this.selectedOptions.push({ ingredient: selectedIngredient, measure: '' });
    }
  }

  addMesure(event:any){
    this.ingredientmesure.push({ingredient:event.option.value,mesure:event.target.value});
    console.log(this.ingredientmesure);
  }


  ngOnInit(): void {
    
    this.getRecipeById(this.editData._id);

    this.ingredientForm = this.fb.group({
      mesure: ['', Validators.required],
    });
    
    this.recipeForm = this.fb.group({
      name : ['',Validators.required],
      mealType : ['',Validators.required],
      image : ['',Validators.required],
      ingredients : ['',Validators.required],
      description : ['',Validators.required],

    });
    this.numbers;
    this.filteredOptions = this.ingredient.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.allingredients.slice();
      }),
    );
      this.getAllIngredients();

      if(this.editData)
      {
        this.buttonAction="Update";
        this.message="Edit";
        this.recipeForm.controls['name'].setValue(this.editData.name);
        this.recipeForm.controls['mealType'].setValue(this.editData.mealType);

      }

  }

  addRecipe() {
    if(!this.editData)
    {
      if(this.recipeForm.valid)
      {
        this.recipeService.addRecipe(this.recipeForm.value).subscribe((data:any)=>{
          console.log(data);
          this.recipeForm.reset();
          this.dialogRef.close('save');
        })
      }
    }
    else
    {
      this.editRecipe();
    }
    }
  editRecipe() {
    this.recipeService.updateRecipe(this.editData._id,this.recipeForm.value).subscribe((data:any)=>{
      console.log(data);
      this.recipeForm.reset();
      this.dialogRef.close('update');
    })
  }


}

