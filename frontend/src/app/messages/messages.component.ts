import { Component, OnInit } from '@angular/core';
import {InpTextService} from "../_services/inp-text.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserIdService} from "../_services/user-id.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private userIdService: UserIdService) {}

  userId: number;
  userEmail: string = '';
  userName: string = '';
  messages: any;
  textMessage: string = '';
  reciverId: number;
  reciverName: number;
  reciverEmail: number;
  recieved: boolean = true;
  authToken: string = this.userIdService.getToken();

  headers = new HttpHeaders()
    .set('Authorization', this.authToken)
    .set('Content-Type', 'application/json');

  ngOnInit() {

    this.recieved = true;
    this.userId = this.userIdService.getUserId();
    this.http.get('http://localhost:2000/message/' + this.userId, {headers: this.headers}).subscribe(data => {
      this.messages = data;
      this.messages.reverse();
    })

    this.http.get('http://localhost:2000/details/' + this.userId, {headers: this.headers}).subscribe(userDetails => {
      this.userEmail = userDetails['email'];
      this.userName = userDetails['name'];
    })
  }


  send(objct) {
    this.reciverId = parseInt(objct.event.target.id);
    let productId = objct.id;
    this.http.get('http://localhost:2000/details/' + this.reciverId, {headers: this.headers}).subscribe(data => {
      this.reciverName = data['name'];
      this.reciverEmail = data['email'];

      var obj: object = {to: this.reciverId, from: this.userId,senderName: this.userName,
        senderEmail:this.userEmail,recieverName:this.reciverName,recieverEmail:this.reciverEmail,
        text: this.textMessage,productId: productId};

      if(this.reciverId == this.userId) {
        alert("Sender and Recipient Can't be same");
        return;
      }

      this.http.post('http://localhost:2000/message', obj, {
        headers: this.headers
      }).subscribe(data => {
        if(data['status'] == 'success') {
          alert('Message Sent Successfully!');
        }
      });
    })
  }

  sent() {
    this.recieved = false;
    this.http.get('http://localhost:2000/message/sent/' + this.userId, {
      headers: this.headers
    }).subscribe(data => {
      this.messages = data;
      this.messages.reverse();
    });
  }

  delete(id) {
    this.http.post('http://localhost:2000/message/delete', {id: id}, {
      headers: this.headers
    }).subscribe(data => {
      if(data['status'] == 'success') {
        this.ngOnInit();
      }
    });
  }

  product(id) {
    let path = 'listings/' + id;
    this.router.navigate([path]);
  }
}
