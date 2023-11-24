import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from '../Models/ingredient';

const URL = 'http://localhost:5000/api/ingredients/';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http:HttpClient) { }

  public getAllIngredients():Observable<Ingredient[]>{
    return this.http.get<Ingredient[]>(URL);
  }

  public getIngredientById(id:string):Observable<Ingredient>{
    return this.http.get<Ingredient>(URL+id);
  }

  public addIngredient(ingredient:Ingredient):Observable<Ingredient>{
    return this.http.post<Ingredient>(URL,ingredient);
  }

  public deleteIngredient(id:string):Observable<Ingredient>{
    return this.http.delete<Ingredient>(URL+id);
  }

  public addArrayIngredients(ingredients:Ingredient[]):Observable<Ingredient[]>{
    return this.http.post<Ingredient[]>(URL+"array",ingredients);
  }



}
