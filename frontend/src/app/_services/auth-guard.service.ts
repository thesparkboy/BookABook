import {EventEmitter, Injectable, Output} from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(private router: Router,private http: HttpClient) {}

  @Output() isLoggendIn: EventEmitter<boolean> = new EventEmitter();

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if(state.url == '/logout') {
      localStorage.removeItem('jwt_token')
      localStorage.removeItem('userId')
      this.router.navigate(['login']);
      this.isLoggendIn.emit(false);
      return false;
    }
    const token = localStorage.getItem('jwt_token');
    const userId = localStorage.getItem('userId');

    let promise = new Promise((resolve, reject) => {
      this.http.get('/gettoken/' + userId).subscribe((data) => {
        if(data['check'] == 'valid' && token == data['token']) {
          this.isLoggendIn.emit(true);
          resolve(true);
        } else {
          this.router.navigate(['login']);
          this.isLoggendIn.emit(false);
          resolve(false);
        }
      });
    });
    return promise;
  }

}
