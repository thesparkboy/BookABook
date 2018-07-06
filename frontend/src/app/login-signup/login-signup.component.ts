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
  valid : boolean = true;


  ngOnInit() {
    if(localStorage.getItem('token') != undefined)
      { this.router.navigate(['listings']) }
  }

  login() {
    var obj = {email: this.loginemail, password: this.loginpass}
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');

    this.http.post('http://localhost:2000/login', obj, {
      headers: headers
    }).subscribe(data => {
      if(data){
        window.localStorage.setItem('jwt_token',data['token']);
        window.localStorage.setItem('userId', data['id']);
        this.router.navigate(['listings']);
      } else {
        alert('Invalid Credentials!');
      }
    });
  }

  chk(event) {
    if(event.keyCode == 13) {
     this.login();
    }
  }

  signup() {
    this.valid = true;
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');

    var obj = {name: this.name, password: this.password, email: this.email, college: this.college, address: this.address, phone: this.phone}

    if(this.name.length == 0){
      alert("Name Can't be Empty!");
      this.valid = false;
    } else if(this.email.length == 0){
      alert("Email Can't be Empty!");
      this.valid = false;
    } else if(this.password.length == 0){
      alert("Password Can't be Empty!");
      this.valid = false;
    } else if(this.phone.length != 10){
      alert("Phone number must be 10 digits!");
      this.valid = false;
    } else if(isNaN(parseInt(this.phone))) {
      alert("Phone number should only contain digits!");
      this.valid = false;
    }

    if(this.valid) {
      this.http.post('http://localhost:2000/signup', obj, {
        headers: headers
      }).subscribe(data => {
        // console.log('==========');
        if(data['status'] == 'success') {
          // console.log(data);
          window.localStorage.setItem('jwt_token',data['token']);
          window.localStorage.setItem('userId',data['id']);
          this.router.navigate(['listings']);
        } else if(data['status'] == 'email'){
            alert('Email Already Registered!')
        } else {
          console.log(data);
        }
      });
    }
  }

  afuConfig = {
    uploadAPI: {
      url:"http://localhost:2000/upload"
    }
  };
}
