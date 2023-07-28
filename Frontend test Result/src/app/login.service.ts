import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './classses/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseURL = "http://localhost:8080";
  constructor(private httpClient: HttpClient) {}

  public generateToken(loginData:any){
    return this.httpClient.post(`${this.baseURL}/generate-token`,loginData);
  }

  //current user which is logged in 
  public getCurrentUser(email:string):Observable<User>{
    return this.httpClient.get<User>(`${this.baseURL}/current-user/`+email);
  }
  
  //login User store token in lcoal storage 
  public loginUser(token:string){
    localStorage.setItem("token",token);
    return true;
  }

  //isLogin or not
  public isLoggedIn(){
    let tokenStr = localStorage.getItem("token");
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }
    return true;
  }

  //logout : remove token from local storage
  public logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  //get token
  public getToken(){
    return localStorage.getItem("token");
  }

  //set user details
  public setUser(user:any){
    localStorage.setItem("user", JSON.stringify(user));
  }

  //get user
  public getUser(){
    let userStr =  localStorage.getItem("user");
    if(userStr != null){
      return JSON.parse(userStr);
    }
    this.logout();
    return null;
  }

  //get user role
  public  getUserRole(){
    let user = this.getUser();
    if(user == null){
      new Promise(resolve => setTimeout(resolve, 1000)).then(() => { });
      console.log("jere")
    }
    console.log(user)
    return user.role;
  }

  public async wait(){
    await new Promise(resolve => setTimeout(resolve, 100000)).then(() => { });
  }
}
