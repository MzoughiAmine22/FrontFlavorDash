import { Ingredient } from './ingredient';

export class Recipe {
  constructor(
    public _id: string,
    public image: string,
    public mealType: string,
    public name: string,
    public ingredients: [
      {
        ingredient: Ingredient;
        mesure:string
      }
    ],
    public instructions: [
      {
        step: number;
        description: string;
      }
    ]
  ) {}
}
