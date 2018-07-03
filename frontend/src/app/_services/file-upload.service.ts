import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) {}


  postFile(fileToUpload: File){
    const endpoint = 'http://localhost:2000/upload';
    const formData: FormData = new FormData();

    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'multipart/form-data');

    formData.append('fileKey', fileToUpload, fileToUpload.name);
    // console.log(fileToUpload);
    return this.http.post(endpoint, formData, { headers: headers }).subscribe();
  }
}
