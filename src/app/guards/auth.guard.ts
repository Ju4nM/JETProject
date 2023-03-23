import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { checkSessionVariables } from '../utils/helpers';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor (
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    let isLogged: boolean = this.isLogged();
    if (!isLogged) this.router.navigate(["/login"]);
    console.log(this.isLogged());
    return this.isLogged();
  }
  
  isLogged () {
    return checkSessionVariables();
  }
  
}
