import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Recipe } from '../../../user/Models/recipe';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  Form,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Ingredient } from '../../../user/Models/ingredient';
import { IngredientService } from '../../../user/Services/ingredient.service';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { RecipeService } from '../../../user/Services/recipe.service';

class Instruction {
  constructor(public step: number, public description: string) {}
}
@Component({
  selector: 'app-recipe-dialog',
  templateUrl: './recipe-dialog.component.html',
  styleUrl: './recipe-dialog.component.scss',
})
export class RecipeDialogComponent implements OnInit {
  deleteIngredient(index: number) {
    this.selectedOptions.splice(index, 1);
  }

  deleteStep(index: number) {
    this.instructions.splice(index, 1);
  }
  message: string = 'Add';
  buttonAction: string = 'Save';
  recipeForm!: FormGroup;
  recipe!: Recipe;
  constructor(
    public dialogRef: MatDialogRef<RecipeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private fb: FormBuilder,
    private ingredientService: IngredientService,
    private recipeService: RecipeService,
    private cdr: ChangeDetectorRef
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  getAllIngredients() {
    this.ingredientService.getAllIngredients().subscribe((data: any) => {
      console.log(data);
      this.allingredients = data;
    });
  }

  getRecipeById(id: string) {
    this.ingredientService.getIngredientById(id).subscribe((data: any) => {
      console.log(data);
      this.recipe = data;
    });
  }

  ingredient = new FormControl<string | Ingredient>('');
  instruction = new FormControl<string | Instruction>('');
  allingredients: Ingredient[] = [];
  ingredientmesure: { ingredient: Ingredient; mesure: string }[] = [];
  instructions: Instruction[] = [];
  filteredOptions!: Observable<Ingredient[]>;
  ingredientForm!: FormGroup;
  instructionForm!: FormGroup;
  addStep(event: any) {
    const step = event.option.value;
    const instructions = this.recipeForm.get('instructions') as FormArray;
    if (!instructions.value.find((item: any) => item.step === step)) {
      instructions.push(
        this.fb.group(
          new Instruction(step, this.instructionForm.get('description')!.value)
        )
      );
    }
  }
  addIngredient() {
    const ingredient = this.fb.group({
      ingredient: ['', Validators.required],
      mesure: ['', Validators.required],
    });

    this.ingredients().push(ingredient);
  }

  removeIngredient(i: number) {
    this.ingredients().removeAt(i);
  }

  ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addInstruction() {
    const instruction = this.fb.group({
      step: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.getInstructions().push(instruction);
  }

  removeInstruction(i: number) {
    this.getInstructions().removeAt(i);
  }

  getInstructions(): FormArray {
    return this.recipeForm.get('instructions') as FormArray;
  }

  numbers: number[] = Array.from({ length: 100 }, (_, i) => i + 1);

  displayFn(ingredientn: Ingredient): string {
    return ingredientn.name;
  }

  private _filter(name: string): Ingredient[] {
    const filterValue = name.toLowerCase();

    return this.allingredients.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  selectedOptions: { ingredient: Ingredient; mesure: string }[] = [];

  addOption(event: MatAutocompleteSelectedEvent) {
    const selectedIngredient = event.option.value;
    const ingredients = this.recipeForm.get('ingredients') as FormArray;
    const alreadyExists = ingredients.value.some(
      (ingredient: any) =>
        ingredient.ingredient.name === selectedIngredient.name
    );

    if (!alreadyExists) {
      ingredients.push(
        this.fb.group({
          ingredient: selectedIngredient,
          mesure: this.ingredientForm.get('mesure')!.value,
        })
      );
      this.ingredientForm.reset();
    }
  }

  addMesure(event: any) {
    this.ingredientmesure.push({
      ingredient: event.option.value,
      mesure: event.target.value,
    });
    console.log(this.ingredientmesure);
  }
  ngOnInit(): void {
    this.ingredientForm = this.fb.group({
      ingredient: ['', Validators.required],
      mesure: ['', Validators.required],
    });

    this.recipeForm = this.fb.group({
      name: '',
      mealType: '',
      image: '',
      ingredients: this.fb.array([]),
      instructions: this.fb.array([]),
    });
    this.instructionForm = this.fb.group({
      step: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.getAllIngredients();

    this.filteredOptions = this.ingredient.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name
          ? this._filter(name as string)
          : this.allingredients.slice();
      })
    );

    if (this.editData) {
      this.getRecipeById(this.editData._id);
      console.log(this.editData);

      this.buttonAction = 'Update';
      this.message = 'Edit';
      this.recipeForm.controls['name'].setValue(this.editData.name);
      this.recipeForm.controls['mealType'].setValue(this.editData.mealType);
      this.recipeForm.controls['image'].setValue(this.editData.image);

      // Populate the ingredients FormArray
      this.editData.ingredients.forEach((ingredient: any) => {
        this.addIngredient();
        const ingredientGroup = this.ingredients().at(
          this.ingredients().length - 1
        ) as FormGroup;
        ingredientGroup.controls['ingredient'].setValue(ingredient.ingredient);
        ingredientGroup.controls['mesure'].setValue(ingredient.mesure);
      });

      // Populate the instructions FormArray
      this.editData.instructions.forEach((instruction: any) => {
        this.addInstruction();
        const instructionGroup = this.getInstructions().at(
          this.getInstructions().length - 1
        ) as FormGroup;
        instructionGroup.controls['step'].setValue(instruction.step);
        instructionGroup.controls['description'].setValue(
          instruction.description
        );
      });
    }
  }

  addRecipe() {
    console.log('hola');
    if (!this.editData) {
      if (this.recipeForm.valid) {
        this.recipeService
          .addRecipe(this.recipeForm.value)
          .subscribe((data: any) => {
            console.log(data);
            this.recipeForm.reset();
            this.dialogRef.close('save');
          });
      }
    } else {
      this.editRecipe();
    }
  }
  editRecipe() {
    const ingredientsWithIdAndMeasure = this.recipeForm.value.ingredients.map(
      (ingredient: any) => {
        return {
          ingredient: ingredient.ingredient._id,
          mesure: ingredient.mesure,
        };
      }
    );
    let body = {
      _id: this.editData._id,
      name: this.recipeForm.value.name,
      mealType: this.recipeForm.value.mealType,
      image: this.recipeForm.value.image,
      ingredients: ingredientsWithIdAndMeasure,
      instructions: this.recipeForm.value.instructions,
    };

    this.recipeService.updateRecipe(body._id, body).subscribe((data: any) => {
      console.log(data);
      this.recipeForm.reset();
      this.dialogRef.close('update');
    });
  }
}
