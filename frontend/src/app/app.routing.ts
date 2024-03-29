import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from "./_services/auth-guard.service";

import { ListingsComponent } from "./listings/listings.component";
import { WishlistComponent } from "./wishlist/wishlist.component";
import { ListingComponent } from "./listing/listing.component";
import { NewListingComponent } from "./new-listing/new-listing.component";
import {TestComponentComponent} from "./test-component/test-component.component";
import {LoginSignupComponent} from "./login-signup/login-signup.component";
import {MyListingsComponent} from "./my-listings/my-listings.component";
import {MessagesComponent} from "./messages/messages.component";
import {NewMessageComponent} from "./new-message/new-message.component";

const appRoutes: Routes = [
  { path: '', redirectTo:'/listings',pathMatch: 'full', canActivate: [AuthGuard]},
  { path: 'login', component: LoginSignupComponent},
  { path: 'logout', component: LoginSignupComponent, canActivate: [AuthGuard]},
  { path: 'listings', component: ListingsComponent, canActivate: [AuthGuard]},
  { path: 'listings/add', component: NewListingComponent, canActivate: [AuthGuard]},
  { path: 'listings/:id', component: ListingComponent, canActivate: [AuthGuard]},
  { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard]},
  { path: 'mylistings', component: MyListingsComponent, canActivate: [AuthGuard]},
  { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]},
  { path: 'test', component: NewMessageComponent},
  { path: '**', redirectTo: '/listings' }
];

export const routing = RouterModule.forRoot(appRoutes,{ useHash: true });
