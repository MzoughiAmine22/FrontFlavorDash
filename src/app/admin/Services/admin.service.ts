import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const URL = 'https://flavord.onrender.com/api/admins/';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  public getAdminCookie():Observable<any>{
    return this.http.get(URL+"cookie",{withCredentials:true});
  }

  public logout():Observable<any>{
    return this.http.get(URL+"logout",{withCredentials:true});
  }

  public login(admin:any):Observable<any>{
    return this.http.post(URL+"login",admin,{withCredentials:true});
  }

}
