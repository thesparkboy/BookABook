import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserIdService} from "../_services/user-id.service";

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private userIdService: UserIdService) {}


  messages : any;
  userId: number;
  unique: any;
  allIds :number[] = [];

  headers = new HttpHeaders()
    .set('Authorization', 'my-auth-token')
    .set('Content-Type', 'application/json');

  ngOnInit() {
    this.userId = this.userIdService.getUserId();
    this.http.get('/message/' + this.userId, {headers: this.headers}).subscribe(data => {
      this.messages = data;
      for(let message of this.messages) {
        this.allIds.push(message.from);
      }
      this.unique = this.allIds.filter((v, i, a) => a.indexOf(v) === i);
    })
    this.http.get('/message/sent/' + this.userId, {headers: this.headers}).subscribe(data => {
      this.messages = data;
      for(let message of this.messages) {
        this.allIds.push(message.to);
      }
      this.unique = this.allIds.filter((v, i, a) => a.indexOf(v) === i);
      console.log(this.unique);
    })
  }

  g


}
