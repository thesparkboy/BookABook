import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit {

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
        window.localStorage.setItem('token',this.email);
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
