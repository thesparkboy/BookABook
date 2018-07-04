import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserIdService} from "../_services/user-id.service";
import {AuthGuardService} from "../_services/auth-guard.service";
import {InpTextService} from "../_services/inp-text.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private userService: UserIdService, private authService: AuthGuardService, private textService: InpTextService) {
      authService.isLoggendIn.subscribe(state => {
        this.isLoggedIn = state;
      })
  }

  ngOnInit() {
  }

  activeMenu = 'listings';

  setActive(item) {
    this.activeMenu = item;
  }

  currentText: string = '';
  change() {
    this.textService.sendText(this.currentText);
  }
}
