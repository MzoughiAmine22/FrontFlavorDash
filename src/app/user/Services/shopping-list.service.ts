import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShoppingList } from '../Models/shopping-list';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private url = 'http://localhost:5000/api/shopping';

  constructor(private http: HttpClient) {}

  createShoppingList(token: string, body: Object): Observable<ShoppingList> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<ShoppingList>(`${this.url}/`, body, { headers });
  }

  getAllShoppingLists(): Observable<ShoppingList[]> {
    return this.http.get<ShoppingList[]>(`${this.url}/`);
  }

  getShoppingListById(token: string, id: string): Observable<ShoppingList> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ShoppingList>(`${this.url}/${id}`, { headers });
  }

  getShoppingListByUser(token: string): Observable<ShoppingList> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ShoppingList>(`${this.url}/user`, {
      headers,
    });
  }

  deleteShoppingList(token: string, id: string): Observable<ShoppingList> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<ShoppingList>(`${this.url}/${id}`, { headers });
  }

  updateShoppingList(
    token: string,
    id: string,
    body: Object
  ): Observable<ShoppingList> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<ShoppingList>(`${this.url}/${id}`, body, { headers });
  }

  deleteIngredientFromShoppingList(
    token: string,
    ingredientId: string
  ): Observable<ShoppingList> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<ShoppingList>(
      `${this.url}/deleteIngredient/${ingredientId}`,
      {
        headers,
      }
    );
  }
}
