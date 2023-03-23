import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor (
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let isAdmin: boolean = this.isAdmin();
    if (!isAdmin) this.router.navigate(["/dashboard/about"]);
    return isAdmin;
  }
  
  isAdmin (): boolean {
    let userType: string | null = sessionStorage.getItem("userType");
    if (userType == "1") return true;
    return false;
  }
}
