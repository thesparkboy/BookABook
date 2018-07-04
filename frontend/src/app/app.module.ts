import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule }    from '@angular/forms';

import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";

import { routing } from "./app.routing";
import { AuthGuardService } from "./_services/auth-guard.service";
import { UserIdService } from "./_services/user-id.service";

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ListingsComponent } from './listings/listings.component';
import { ListingComponent } from './listing/listing.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { NewListingComponent } from './new-listing/new-listing.component';
import { FileUploadService } from "./_services/file-upload.service";
import { TestComponentComponent } from './test-component/test-component.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { HeaderComponent } from './header/header.component';
import { InpTextService } from "./_services/inp-text.service";

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ListingsComponent,
    ListingComponent,
    WishlistComponent,
    NewListingComponent,
    TestComponentComponent,
    LoginSignupComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [AuthGuardService, UserIdService, FileUploadService, InpTextService],
  bootstrap: [AppComponent]
})
export class AppModule { }
