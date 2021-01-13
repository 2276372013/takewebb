import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AuthService{
  public isLoding: boolean = false;
  constructor(private router: Router){}

  public getAuthorizationToken(){
    const token = sessionStorage.getItem("token");
    if(token){
      const jwt = token;
      return jwt;
    }else{
      return null;
    }
  }

}
