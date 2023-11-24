import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookList } from '../Models/cook-list';

const URL = 'http://localhost:5000/api/cooklist/';
@Injectable({
  providedIn: 'root',
})
export class CookListService {
  constructor(private http: HttpClient) {}

  public getAllCooklists(): Observable<CookList[]> {
    return this.http.get<CookList[]>(URL + 'all');
  }

  public getUserCooklist(token: string): Observable<CookList> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<CookList>(URL, { headers });
  }
  public addRecipeToCooklist(id: string, token: string): Observable<CookList> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<CookList>(URL + id, null, { headers });
  }
  public deleteRecipeFromCooklist(
    id: string,
    token: string
  ): Observable<CookList> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<CookList>(URL + id, { headers });
  }
}
