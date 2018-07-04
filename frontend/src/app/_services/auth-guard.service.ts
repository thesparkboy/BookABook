import {EventEmitter, Injectable, Output} from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(private router: Router) {}

  @Output() isLoggendIn: EventEmitter<boolean> = new EventEmitter();

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(state.url == '/logout') {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      this.router.navigate(['login']);
      this.isLoggendIn.emit(false);
      return false;
    }
    const token = localStorage.getItem('token');
    if (!token) {
        this.router.navigate(['login']);
        this.isLoggendIn.emit(false);
        return false;
    }
    this.isLoggendIn.emit(true);
    return true;
  }

}
