import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserIdService} from "../_services/user-id.service";
import {InpTextService} from "../_services/inp-text.service";

@Component({
  selector: 'app-my-listings',
  templateUrl: './my-listings.component.html',
  styleUrls: ['./my-listings.component.css']
})
export class MyListingsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private userIdService: UserIdService,
    private textService: InpTextService) {

    this.textService.searchText.subscribe(data => {
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

  ngOnInit() {
    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');

    let userId : number = this.userIdService.getUserId();
    this.http.get('http://localhost:2000/mylistings/' + userId, {headers: headers}).subscribe(data => {
      this.items = data;
    })
  }

  showDetail($event){
    var id : number = parseInt($event.target.id);
    this.router.navigate((['listings/' + id]));
  }

  removeFromListings($event){

    var bookId : number = parseInt($event.target.id);

    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');

    this.http.post('http://localhost:2000/removefromlistings', {id: bookId}, {
      headers: headers
    }).subscribe(data => {
      // console.log(data);
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

