import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ActivatedRoute, Router} from "@angular/router";
import {UserIdService} from "../_services/user-id.service";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private userIdService: UserIdService) {}

  items : any = '';

  ngOnInit() {
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');

    let userId : number = this.userIdService.getUserId();
    this.http.get('http://localhost:2000/wishlist/' + userId, {headers: headers}).subscribe(data => {
      this.items = data;
      console.log(this.items)
    })
  }

}

