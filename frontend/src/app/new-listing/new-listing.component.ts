import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {UserIdService} from "../_services/user-id.service";
import {FileUploadService} from "../_services/file-upload.service";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-listing',
  templateUrl: './new-listing.component.html',
  styleUrls: ['./new-listing.component.css']
})
export class NewListingComponent implements OnInit {

  bookName : string = '';
  author : string = '';
  price : string = '';
  condition : string = 'New';
  imgUrl : string = '';
  fileToUpload: File = null;
  obj: object = {};
  valid: boolean = true;
  conditions: string[] = ['New', 'Almost New','Slighlty Damaged', 'Worn'];

  constructor(private http: HttpClient,private userIdService: UserIdService,private fileUploadService: FileUploadService) { }

  ngOnInit() {
  }

  submit() {
    this.valid = true;
    let sellerID: number = this.userIdService.getUserId();
    this.obj = {
      seller: sellerID,
      bookName: this.bookName,
      authorName: this.author,
      price: this.price,
      condition: this.condition,
      imgUrl: this.imgUrl
    }

    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');

    if(this.bookName.length == 0){
      alert("Book Name Can't be Empty!");
      this.valid = false;
    } else if(this.author.length == 0) {
      alert("Author Name Can't be Empty!");
      this.valid = false;
    } else if(this.price.length == 0) {
      alert("Price Field Can't be Empty!");
      this.valid = false;
    } else if(isNaN(parseInt(this.price))) {
      alert("Price must be a number");
      this.valid = false;
    } else if(parseInt(this.price) < 0){
      alert("Price Can't be less than 0!");
      this.valid = false;
    }

    if (this.valid) {
        this.http.post('http://localhost:2000/listings/add', this.obj, {
          headers: headers
        }).subscribe(data => {
           alert('Listing added Successfully!');
           this.bookName = '';
           this.author = '';
           this.price = '';
           this.imgUrl = '';
        });
    }
  }

  selectedCondition(condition) {
    this.condition = condition;
  }
}
