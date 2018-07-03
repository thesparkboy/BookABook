import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ActivatedRoute, Router} from "@angular/router";
import {parse} from "querystring";

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient ) {}

    items : any = '';

  ngOnInit() {
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');

    this.http.get('http://localhost:2000/listings', {headers: headers}).subscribe(data => {
      this.items = data;
    })
  }

  showDetail($event){
    var id : number = parseInt($event.target.id);
    this.router.navigate((['listings/' + id]));
  }

  addToWishlist($event){

    var bookId : number = parseInt($event.target.id);
    var userId: number = parseInt(localStorage.getItem('userId'));
    var obj: object = {bookid: bookId,userid: userId};

    console.log(obj);

    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');

    this.http.post('http://localhost:2000/addtowishlist', obj, {
      headers: headers
    }).subscribe(data => {
      if(data['status'] == 'success') {
        alert('Item added to Wishlist Successfully!');
      }
    });
  }
}
