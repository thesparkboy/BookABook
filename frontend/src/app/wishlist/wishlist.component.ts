import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from "@angular/router";
import { UserIdService } from "../_services/user-id.service";
import {InpTextService} from "../_services/inp-text.service";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private userIdService: UserIdService,
    private textSerice: InpTextService) {

    this.textSerice.searchText.subscribe(data => {
      this.text = data;
    })

  }

  wihslists : any = '';
  items: any = [];

  text: string = '';
  conditions: string[] = ['New', 'Almost New','Slighlty Damaged', 'Worn'];
  minPrice: number = 0;
  maxPrice: number = 10000000 ;
  condition = '';
  showPriceFilter: boolean = false;
  showConditionFilter: boolean = false;
  priceBoxValue: any;
  conditionBoxValue: any;
  sortPrice: any;
  sortCondition: any;
  authToken: string = this.userIdService.getToken();

  ngOnInit() {
    const headers = new HttpHeaders()
      .set('Authorization', this.authToken)
      .set('Content-Type', 'application/json');

    let userId : number = this.userIdService.getUserId();
    this.http.get('/wishlist/' + userId, {headers: headers}).subscribe(data => {
      this.wihslists = data;
      for(let wishlist of this.wihslists) {
        let bookid = wishlist.bookid;
        this.http.get('/listings/' + bookid, {headers: headers}).subscribe(data => {
          this.items.push(data);
        })
      }
    })
  }

  showDetail($event){
    var id : number = parseInt($event.target.id);
    this.router.navigate((['listings/' + id]));
  }

  removeFromWishlist($event){

    var bookId : number = parseInt($event.target.id);
    let userId : number = this.userIdService.getUserId();
    var obj: object = {bookid: bookId,userid: userId};

    const headers = new HttpHeaders()
      .set('Authorization', this.authToken)
      .set('Content-Type', 'application/json');

    this.http.post('/removefromwishlist', obj, {
      headers: headers
    }).subscribe(data => {
      console.log(data);
      this.items = [];
      this.ngOnInit();
    });
  }



  filter(items: any[]) {
    let arr = [];
    for(let item of items) {
      if(item != undefined){
        if(item.bookName.toLowerCase().includes(this.text.toLowerCase()) || item.authorName.toLowerCase().includes(this.text.toLowerCase())){
          if(parseInt(item.price) >= this.minPrice && parseInt(item.price) <= this.maxPrice)
            if(this.showConditionFilter) {
              if(item.condition == this.condition || this.condition == '') {
                arr.push(item);
              }
            } else
              arr.push(item);
        }
      }
    }

    if(this.sortPrice) {
      arr.sort((a,b) => (a.price - b.price));
    }
    if(this.sortCondition) {
      arr.sort((a,b) => (this.conditions.indexOf(a.condition) - this.conditions.indexOf(b.condition)));
    }
    if(this.sortCondition && this.sortPrice) {
      arr.sort((a,b) => {
        if(a.price != b.price) {
          return a.price - b.price;
        }
        return this.conditions.indexOf(a.condition) - this.conditions.indexOf(b.condition)});
    }
    return arr;
  }

  setPriceFilter(filter){
    this.showPriceFilter = filter;
  }

  setConditionFilter(filter){
    this.showConditionFilter = filter;
  }

  selectedCondition(condition) {
    this.condition = condition;
  }

  setSortPrice(sortPrice) {
    this.sortPrice = sortPrice;
  }

  setSortCondition(sortCondition) {
    this.sortCondition = sortCondition;
  }

  reset() {
    this.showConditionFilter = false;
    this.showPriceFilter = false;
    this.condition = '';
    this.minPrice = 0;
    this.maxPrice = 1000000;
    this.priceBoxValue = false;
    this.conditionBoxValue = false;
    this.sortPrice = false;
    this.sortCondition = false;
  }

}

