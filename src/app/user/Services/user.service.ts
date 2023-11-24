import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import { Observable } from 'rxjs';

const URL = 'http://localhost:5000/api/users/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  public getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(URL);
  }
  public getUserById(id:string):Observable<User>{
    return this.http.get<User>(URL+id);
  }

  public signup(user:User):Observable<User>{
    return this.http.post<User>(URL+'register',user);
  }

  public login(usercreds:any):Observable<any>{
    return this.http.post<any>(URL+'login',usercreds,{withCredentials:true});
  }

  public logout():Observable<any>{
    return this.http.get<any>(URL+'logout',{withCredentials:true});
  }

  public getUserCookie():Observable<any>{
    return this.http.get<any>(URL+'cookie',{withCredentials:true});
  }

  public updateUser(id:string,user:User):Observable<User>{
    return this.http.put<User>(URL+id,user);
  }

  public changepassword(id:string,oldpassword:string,newpassword:string){
    return this.http.put(URL+'changepassword/'+id,{oldpassword,newpassword});
  }

  public deleteUser(id:string):Observable<User>{
    return this.http.delete<User>(URL+id);
  }

}
