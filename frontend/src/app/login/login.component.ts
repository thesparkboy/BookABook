import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient ) {}

  email: string = '';
  password: string = '';
  invalid : boolean = false;

  ngOnInit() {
  }

  login() {
    var obj = {email: this.email, password: this.password}
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
      } else {
        this.invalid = true;
      }
    });
  }


}
