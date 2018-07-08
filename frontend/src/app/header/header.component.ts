import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserIdService} from "../_services/user-id.service";
import {AuthGuardService} from "../_services/auth-guard.service";
import {InpTextService} from "../_services/inp-text.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private userService: UserIdService, private authService: AuthGuardService, private textService: InpTextService,private router: Router) {
      authService.isLoggendIn.subscribe(state => {
        this.isLoggedIn = state;
      })
  }

  activeMenu = 'listings';

  ngOnInit() {
    if(window.location.pathname == "/listings/add"){
      this.activeMenu = 'add';
    }
    if(window.location.pathname == "/messages"){
      this.activeMenu = 'messages';
    }
    if(window.location.pathname == "/wishlist"){
      this.activeMenu = 'wishlist';
    }
    if(window.location.pathname == "/mylistings"){
      this.activeMenu = 'messmyages';
    }
    if(window.location.pathname == "/mylistings"){
      this.activeMenu = 'listings';
    }
  }

  setActive(item) {
    this.activeMenu = item;
  }

  currentText: string = '';
  change() {
    this.textService.sendText(this.currentText);
  }
}
