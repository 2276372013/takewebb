import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, RouterLink } from '@angular/router';
import { Injectable } from '@angular/core';
// import { AuthService } from '../service/auth.service';
import { UsersService } from '../service/Users.service';
import { Msg } from '../interfaceEntity/Entity/Msg.interface';

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private usersService: UsersService, private router: Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    this.usersService.isLogin().subscribe(
      (result: Msg) => {
        if ((result.data === "ok")){
          return true;
        }else{
          this.router.navigate(['welcome']);
        }
      }
    )
    return false;
  }
}
