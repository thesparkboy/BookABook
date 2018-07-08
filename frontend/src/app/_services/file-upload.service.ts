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

    formData.append('avatar', image);
    this.http.post('/upload?id=' + id, formData).subscribe(value =>{
      return 'item uploaded successfully';
    });
  }
}
