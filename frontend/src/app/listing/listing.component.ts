import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient ) {}

  item : any = '';
  id: number = 1;

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });

    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');

    this.http.get('http://localhost:2000/listings/' + this.id, {headers: headers}).subscribe(data => {
      this.item = data;
    })
  }
}
