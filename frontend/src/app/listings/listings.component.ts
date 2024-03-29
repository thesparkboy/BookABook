import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ActivatedRoute, Router} from "@angular/router";
import {InpTextService} from "../_services/inp-text.service";
import {UserIdService} from "../_services/user-id.service";

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {

  items : any = '';
  text: string = '';
  options: string[] = ['Price', 'Condition'];
  conditions: string[] = ['New', 'Almost New', 'Slighlty Damaged', 'Worn'];
  minPrice: number = 0;
  maxPrice: number = 10000000 ;
  condition = '';
  showPriceFilter: boolean = false;
  showConditionFilter: boolean = false;
  selectedFiler: string = 'Price';
  priceBoxValue: any;
  conditionBoxValue: any;
  selectedCond: string;
  sortPrice: any;
  sortCondition: any;
  authToken: string = this.userIdService.getToken();
  // c: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private textSerice: InpTextService,
    private userIdService: UserIdService) {

    this.textSerice.searchText.subscribe(data => {
      this.text = data;
    })
  }


  ngOnInit() {
    this.selectedCond = 'New';
    const headers = new HttpHeaders()
      .set('Authorization', this.authToken)
      .set('Content-Type', 'application/json');

    this.http.get('/listings', {headers: headers}).subscribe(data => {
      this.items = data;
    })
  }

  showDetail($event){
    var id : number = parseInt($event.target.id);
    this.router.navigate((['listings/' + id]));
  }

  addToWishlist($event){

    var bookId : number = parseInt($event.target.id);
    var userId: number = parseInt(localStorage.getItem('userId'));
    var obj: object = {bookid: bookId,userid: userId};

    const headers = new HttpHeaders()
      .set('Authorization', this.authToken)
      .set('Content-Type', 'application/json');

    this.http.post('/addtowishlist', obj, {
      headers: headers
    }).subscribe(data => {
      if(data['status'] == 'success') {
        alert('Item added to Wishlist Successfully!');
      }
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
