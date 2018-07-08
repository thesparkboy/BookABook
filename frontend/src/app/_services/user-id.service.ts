import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserIdService {
  constructor() { }

  getUserId () : number{
    return parseInt(localStorage.getItem('userId'));
  }

  getToken() : string{
    return (localStorage.getItem('jwt_token'));
  }
}
