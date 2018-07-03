import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient ) {}

  loginemail: string = '';
  loginpass: string = '';
  name: string = '';
  email: string = '';
  password: string = '';
  college: string = '';
  phone: string = '';
  address: string = 'ggsipu';
  invalid : boolean = false;

  ngOnInit() {
    if(localStorage.getItem('token') != undefined)
      { this.router.navigate(['listings']) }
  }

  login() {
    var obj = {email: this.loginemail, password: this.loginpass}
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');

    // console.log(obj);

    this.http.post('http://localhost:2000/login', obj, {
      headers: headers
    }).subscribe(data => {
      // console.log(data);
      if(data){
        window.localStorage.setItem('token',this.loginemail);
        window.localStorage.setItem('userId',data['id']);
        this.router.navigate(['listings']);
        this.invalid = false;
      } else {
        this.invalid = true;
      }
    });
  }


  signup() {
    var obj = {name: this.name, password: this.password, email: this.email, college: this.college, address: this.address, phone: this.phone}

    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');

    // console.log(obj);

    this.http.post('http://localhost:2000/signup', obj, {
      headers: headers
    }).subscribe(data => {
      if(data) {
        this.router.navigate(['listings']);
      } else {
        console.log(data);
      }
    });
  }
}
