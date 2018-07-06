import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserIdService} from "./user-id.service";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient,
              private router: Router,
              private userIdService:UserIdService) {}



  addProduct(image, id) {
    var formData: any = new FormData();

    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'multipart/form-data');

    // console.log(image);
    formData.append('avatar', image, id.toString());
    this.http.post('http://localhost:2000/upload?id=' + id, formData).subscribe(value =>{
      return 'item uploaded successfully';
    });
    // this.http.post('http://localhost:3000/upload', data, {headers: headers}).subscribe(data =>{
    //   let id = data;
    //   console.log(id);
    //
    // })
  }
}
