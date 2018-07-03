import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(state.url == '/logout') {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      this.router.navigate(['login']);
      return false;
    }
    const token = localStorage.getItem('token');
    if (!token) {
        this.router.navigate(['login']);
        return false;
    }
    return true;
  }

}
