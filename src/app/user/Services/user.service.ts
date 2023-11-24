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

  public login(email:string,password:string){
    return this.http.post(URL+'login',{email,password});
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
