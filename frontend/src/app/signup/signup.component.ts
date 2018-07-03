import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private http: HttpClient) { }

  name: string = '';
  password: string = '';
  email: string = '';
  address: string = '';
  phone: string = '';
  college: string = '';

  submit() {
    var obj = {name: this.name, password: this.password, email: this.email, college: this.college, address: this.address, phone: this.phone}
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');
    console.log(obj);
    this.http.post('http://localhost:2000/signup', obj, {
      headers: headers
    }).subscribe(data => {
      console.log(data);
    });
  }

  ngOnInit() {
  }

}
