import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from "./_services/auth-guard.service";

import { SignupComponent } from "./signup/signup.component";
import { LoginComponent } from "./login/login.component";
import { ListingsComponent } from "./listings/listings.component";
import { WishlistComponent } from "./wishlist/wishlist.component";
import { ListingComponent } from "./listing/listing.component";
import { NewListingComponent } from "./new-listing/new-listing.component";
import {TestComponentComponent} from "./test-component/test-component.component";
import {LoginSignupComponent} from "./login-signup/login-signup.component";

const appRoutes: Routes = [
  { path: '', component: LoginSignupComponent},
  { path: 'login', component: LoginSignupComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'logout', component: LoginComponent, canActivate: [AuthGuard]},
  { path: 'listings', component: ListingsComponent, canActivate: [AuthGuard]},
  { path: 'listings/add', component: NewListingComponent, canActivate: [AuthGuard]},
  { path: 'listings/:id', component: ListingComponent, canActivate: [AuthGuard]},
  { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard]},
  { path:'test', component: TestComponentComponent},
  { path: '**', redirectTo: '/login' }
];

export const routing = RouterModule.forRoot(appRoutes);
