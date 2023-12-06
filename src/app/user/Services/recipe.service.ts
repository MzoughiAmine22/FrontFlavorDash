import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../Models/recipe';
import { Observable } from 'rxjs';

const URL = 'https://flavord.onrender.com/api/recipes/';
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http:HttpClient) { }

  public getAllRecipes():Observable<Recipe[]>{
    return this.http.get<Recipe[]>(URL);
  }

  public getRecipeDetails(id:string):Observable<Recipe>{
    return this.http.get<Recipe>(URL+"getById/"+id);
  }

  public addRecipe(recipe:Recipe):Observable<Recipe>{
    return this.http.post<Recipe>(URL,recipe);
  }

  public deleteRecipe(id:string):Observable<Recipe>{
    return this.http.delete<Recipe>(URL+id);
  }

  public updateRecipe(id:string,recipe:Recipe):Observable<Recipe>{
    return this.http.put<Recipe>(URL+id,recipe);
  }

  public getRecipeByCriteria(criteria:string):Observable<Recipe[]>{
    return this.http.get<Recipe[]>(URL+"q?"+criteria);
  }

}
