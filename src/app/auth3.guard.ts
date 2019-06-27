import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth3Guard implements CanActivate {

  constructor(private myRoute: Router){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(localStorage.getItem("adminToken") != null && localStorage.getItem("typeOfUsers") == "3"){
        return true;
      }else{
        this.myRoute.navigate(["login"]);
        return false;
      }
  }
}
