import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { checkSessionVariables } from '../utils/helpers';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  
  constructor (
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isLogged: boolean = this.isLogged();
  
    if (isLogged) this.router.navigate(["/dashboard"]);
    console.log(isLogged);
    return !isLogged;
  }
  
  isLogged () {
    return checkSessionVariables();
  }
}
