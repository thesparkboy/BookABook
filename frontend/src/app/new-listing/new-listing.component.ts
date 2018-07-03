import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {UserIdService} from "../_services/user-id.service";
import {FileUploadService} from "../_services/file-upload.service";

@Component({
  selector: 'app-new-listing',
  templateUrl: './new-listing.component.html',
  styleUrls: ['./new-listing.component.css']
})
export class NewListingComponent implements OnInit {

  bookName : string = '';
  author : string = '';
  price : string = '';
  condition : string = '';
  imgUrl : string = '';
  fileToUpload: File = null;


  constructor(private http: HttpClient,private userIdService: UserIdService,private fileUploadService: FileUploadService) { }

  ngOnInit() {
  }

  submit() {
    let sellerID : number = this.userIdService.getUserId();
    let obj = {seller: sellerID, bookName: this.bookName, authorName: this.author, price: this.price, condition: this.condition, imgUrl: this.imgUrl}

    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');

    this.http.post('http://localhost:2000/listings/add', obj, {
      headers: headers
    }).subscribe(data => {
      console.log(data);
    });
  }

  // handleFileInput(files: FileList) {
  //   // console.log(files);
  //   this.fileToUpload = files.item(0);
  //   this.uploadFileToActivity();
  // }
  //
  // uploadFileToActivity() {
  //   this.fileUploadService.postFile(this.fileToUpload);
  // }
}
