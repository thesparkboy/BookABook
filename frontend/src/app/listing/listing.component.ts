import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UserIdService} from "../_services/user-id.service";

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private userIdService: UserIdService) {}

  item : any = '';
  id: number = 1;
  userEmail: any;
  sellerEmail: any;
  userId: number;
  sellerId: number;
  sellerName: any;
  textMessage: string = '';
  userName: string = '';

  headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });

    this.http.get('http://localhost:2000/listings/' + this.id, {headers: this.headers}).subscribe(data => {
      this.item = data;
      this.userId = this.userIdService.getUserId();
      this.sellerId = this.item.seller;

      this.http.get('http://localhost:2000/details/' + this.userId, {headers: this.headers}).subscribe(userDetails => {
        this.userEmail = userDetails['email'];
        this.userName = userDetails['name'];
      })

      this.http.get('http://localhost:2000/details/' + this.sellerId, {headers: this.headers}).subscribe(sellerDetails => {
        this.sellerEmail = sellerDetails['email'];
        this.sellerName = sellerDetails['name'];
      })
    })
  }


  addToWishlist($event){

    var bookId : number = parseInt($event.target.id);
    var userId: number = parseInt(localStorage.getItem('userId'));
    var obj: object = {bookid: bookId, userid: userId};

    this.http.post('http://localhost:2000/addtowishlist', obj, {
      headers: this.headers
    }).subscribe(data => {
      if(data['status'] == 'success') {
        alert('Item added to Wishlist Successfully!');
      }
    });
  }

  send() {
    var obj: object = {to: this.sellerId, from: this.userId,senderName: this.userName,
                       senderEmail:this.userEmail,recieverName:this.sellerName,recieverEmail:this.sellerEmail,
                       text: this.textMessage};
    if(this.sellerId == this.userId) {
      alert("Sender and Recipient can't be same");
      return;
    }
    this.http.post('http://localhost:2000/message', obj, {
      headers: this.headers
    }).subscribe(data => {
      if(data['status'] == 'success') {
        alert('Message Sent Successfully!');
      }
    });
  }
}
