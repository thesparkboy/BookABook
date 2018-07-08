(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/_services/auth-guard.service.ts":
/*!*************************************************!*\
  !*** ./src/app/_services/auth-guard.service.ts ***!
  \*************************************************/
/*! exports provided: AuthGuardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuardService", function() { return AuthGuardService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuardService = /** @class */ (function () {
    function AuthGuardService(router, http) {
        this.router = router;
        this.http = http;
        this.isLoggendIn = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    AuthGuardService.prototype.canActivate = function (route, state) {
        var _this = this;
        if (state.url == '/logout') {
            localStorage.removeItem('jwt_token');
            localStorage.removeItem('userId');
            this.router.navigate(['login']);
            this.isLoggendIn.emit(false);
            return false;
        }
        var token = localStorage.getItem('jwt_token');
        var userId = localStorage.getItem('userId');
        var promise = new Promise(function (resolve, reject) {
            _this.http.get('http://localhost:2000/gettoken/' + userId).subscribe(function (data) {
                if (data['check'] == 'valid' && token == data['token']) {
                    _this.isLoggendIn.emit(true);
                    resolve(true);
                }
                else {
                    _this.router.navigate(['login']);
                    _this.isLoggendIn.emit(false);
                    resolve(false);
                }
            });
        });
        return promise;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], AuthGuardService.prototype, "isLoggendIn", void 0);
    AuthGuardService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], AuthGuardService);
    return AuthGuardService;
}());



/***/ }),

/***/ "./src/app/_services/file-upload.service.ts":
/*!**************************************************!*\
  !*** ./src/app/_services/file-upload.service.ts ***!
  \**************************************************/
/*! exports provided: FileUploadService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileUploadService", function() { return FileUploadService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _user_id_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user-id.service */ "./src/app/_services/user-id.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FileUploadService = /** @class */ (function () {
    function FileUploadService(http, router, userIdService) {
        this.http = http;
        this.router = router;
        this.userIdService = userIdService;
    }
    FileUploadService.prototype.addProduct = function (image, id) {
        var formData = new FormData();
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]()
            .set('Authorization', 'my-auth-token')
            .set('Content-Type', 'multipart/form-data');
        formData.append('avatar', image);
        this.http.post('http://localhost:2000/upload?id=' + id, formData).subscribe(function (value) {
            return 'item uploaded successfully';
        });
    };
    FileUploadService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _user_id_service__WEBPACK_IMPORTED_MODULE_3__["UserIdService"]])
    ], FileUploadService);
    return FileUploadService;
}());



/***/ }),

/***/ "./src/app/_services/inp-text.service.ts":
/*!***********************************************!*\
  !*** ./src/app/_services/inp-text.service.ts ***!
  \***********************************************/
/*! exports provided: InpTextService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InpTextService", function() { return InpTextService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var InpTextService = /** @class */ (function () {
    function InpTextService() {
        this.searchText = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.text = '';
    }
    InpTextService.prototype.sendText = function (txt) {
        this.text = txt;
        this.setText();
    };
    InpTextService.prototype.setText = function () {
        this.searchText.emit(this.text);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], InpTextService.prototype, "searchText", void 0);
    InpTextService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], InpTextService);
    return InpTextService;
}());



/***/ }),

/***/ "./src/app/_services/user-id.service.ts":
/*!**********************************************!*\
  !*** ./src/app/_services/user-id.service.ts ***!
  \**********************************************/
/*! exports provided: UserIdService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserIdService", function() { return UserIdService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var UserIdService = /** @class */ (function () {
    function UserIdService() {
    }
    UserIdService.prototype.getUserId = function () {
        return parseInt(localStorage.getItem('userId'));
    };
    UserIdService.prototype.getToken = function () {
        return (localStorage.getItem('jwt_token'));
    };
    UserIdService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], UserIdService);
    return UserIdService;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-header></app-header>\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app';
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/index.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var angular_file_uploader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! angular-file-uploader */ "./node_modules/angular-file-uploader/fesm5/angular-file-uploader.js");
/* harmony import */ var _app_routing__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app.routing */ "./src/app/app.routing.ts");
/* harmony import */ var _services_auth_guard_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./_services/auth-guard.service */ "./src/app/_services/auth-guard.service.ts");
/* harmony import */ var _services_user_id_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./_services/user-id.service */ "./src/app/_services/user-id.service.ts");
/* harmony import */ var _listings_listings_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./listings/listings.component */ "./src/app/listings/listings.component.ts");
/* harmony import */ var _listing_listing_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./listing/listing.component */ "./src/app/listing/listing.component.ts");
/* harmony import */ var _wishlist_wishlist_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./wishlist/wishlist.component */ "./src/app/wishlist/wishlist.component.ts");
/* harmony import */ var _new_listing_new_listing_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./new-listing/new-listing.component */ "./src/app/new-listing/new-listing.component.ts");
/* harmony import */ var _services_file_upload_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./_services/file-upload.service */ "./src/app/_services/file-upload.service.ts");
/* harmony import */ var _test_component_test_component_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./test-component/test-component.component */ "./src/app/test-component/test-component.component.ts");
/* harmony import */ var _login_signup_login_signup_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./login-signup/login-signup.component */ "./src/app/login-signup/login-signup.component.ts");
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./header/header.component */ "./src/app/header/header.component.ts");
/* harmony import */ var _services_inp_text_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./_services/inp-text.service */ "./src/app/_services/inp-text.service.ts");
/* harmony import */ var _my_listings_my_listings_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./my-listings/my-listings.component */ "./src/app/my-listings/my-listings.component.ts");
/* harmony import */ var _messages_messages_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./messages/messages.component */ "./src/app/messages/messages.component.ts");
/* harmony import */ var _new_message_new_message_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./new-message/new-message.component */ "./src/app/new-message/new-message.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                _listings_listings_component__WEBPACK_IMPORTED_MODULE_10__["ListingsComponent"],
                _listing_listing_component__WEBPACK_IMPORTED_MODULE_11__["ListingComponent"],
                _wishlist_wishlist_component__WEBPACK_IMPORTED_MODULE_12__["WishlistComponent"],
                _new_listing_new_listing_component__WEBPACK_IMPORTED_MODULE_13__["NewListingComponent"],
                _test_component_test_component_component__WEBPACK_IMPORTED_MODULE_15__["TestComponentComponent"],
                _login_signup_login_signup_component__WEBPACK_IMPORTED_MODULE_16__["LoginSignupComponent"],
                _header_header_component__WEBPACK_IMPORTED_MODULE_17__["HeaderComponent"],
                _my_listings_my_listings_component__WEBPACK_IMPORTED_MODULE_19__["MyListingsComponent"],
                _messages_messages_component__WEBPACK_IMPORTED_MODULE_20__["MessagesComponent"],
                _new_message_new_message_component__WEBPACK_IMPORTED_MODULE_21__["NewMessageComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_4__["NgbModule"].forRoot(),
                angular_file_uploader__WEBPACK_IMPORTED_MODULE_6__["AngularFileUploaderModule"],
                _app_routing__WEBPACK_IMPORTED_MODULE_7__["routing"]
            ],
            providers: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_8__["AuthGuardService"], _services_user_id_service__WEBPACK_IMPORTED_MODULE_9__["UserIdService"], _services_file_upload_service__WEBPACK_IMPORTED_MODULE_14__["FileUploadService"], _services_inp_text_service__WEBPACK_IMPORTED_MODULE_18__["InpTextService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/app.routing.ts":
/*!********************************!*\
  !*** ./src/app/app.routing.ts ***!
  \********************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_auth_guard_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_services/auth-guard.service */ "./src/app/_services/auth-guard.service.ts");
/* harmony import */ var _listings_listings_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./listings/listings.component */ "./src/app/listings/listings.component.ts");
/* harmony import */ var _wishlist_wishlist_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./wishlist/wishlist.component */ "./src/app/wishlist/wishlist.component.ts");
/* harmony import */ var _listing_listing_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./listing/listing.component */ "./src/app/listing/listing.component.ts");
/* harmony import */ var _new_listing_new_listing_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./new-listing/new-listing.component */ "./src/app/new-listing/new-listing.component.ts");
/* harmony import */ var _login_signup_login_signup_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./login-signup/login-signup.component */ "./src/app/login-signup/login-signup.component.ts");
/* harmony import */ var _my_listings_my_listings_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./my-listings/my-listings.component */ "./src/app/my-listings/my-listings.component.ts");
/* harmony import */ var _messages_messages_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./messages/messages.component */ "./src/app/messages/messages.component.ts");
/* harmony import */ var _new_message_new_message_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./new-message/new-message.component */ "./src/app/new-message/new-message.component.ts");










var appRoutes = [
    { path: '', redirectTo: '/listings', pathMatch: 'full', canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_1__["AuthGuardService"]] },
    { path: 'login', component: _login_signup_login_signup_component__WEBPACK_IMPORTED_MODULE_6__["LoginSignupComponent"] },
    { path: 'logout', component: _login_signup_login_signup_component__WEBPACK_IMPORTED_MODULE_6__["LoginSignupComponent"], canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_1__["AuthGuardService"]] },
    { path: 'listings', component: _listings_listings_component__WEBPACK_IMPORTED_MODULE_2__["ListingsComponent"], canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_1__["AuthGuardService"]] },
    { path: 'listings/add', component: _new_listing_new_listing_component__WEBPACK_IMPORTED_MODULE_5__["NewListingComponent"], canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_1__["AuthGuardService"]] },
    { path: 'listings/:id', component: _listing_listing_component__WEBPACK_IMPORTED_MODULE_4__["ListingComponent"], canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_1__["AuthGuardService"]] },
    { path: 'wishlist', component: _wishlist_wishlist_component__WEBPACK_IMPORTED_MODULE_3__["WishlistComponent"], canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_1__["AuthGuardService"]] },
    { path: 'mylistings', component: _my_listings_my_listings_component__WEBPACK_IMPORTED_MODULE_7__["MyListingsComponent"], canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_1__["AuthGuardService"]] },
    { path: 'messages', component: _messages_messages_component__WEBPACK_IMPORTED_MODULE_8__["MessagesComponent"], canActivate: [_services_auth_guard_service__WEBPACK_IMPORTED_MODULE_1__["AuthGuardService"]] },
    { path: 'test', component: _new_message_new_message_component__WEBPACK_IMPORTED_MODULE_9__["NewMessageComponent"] },
    { path: '**', redirectTo: '/listings' }
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(appRoutes);


/***/ }),

/***/ "./src/app/header/header.component.css":
/*!*********************************************!*\
  !*** ./src/app/header/header.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "nav {\n  font-size: 1.1em;\n}\n"

/***/ }),

/***/ "./src/app/header/header.component.html":
/*!**********************************************!*\
  !*** ./src/app/header/header.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-lg navbar-light bg-light\">\n  <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarTogglerDemo01\" aria-controls=\"navbarTogglerDemo01\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n    <span class=\"navbar-toggler-icon\"></span>\n  </button>\n  <div class=\"collapse navbar-collapse in\" id=\"navbarTogglerDemo01\">\n    <a class=\"navbar-brand\" [routerLink]=\"['/listings']\"><i class=\"fas fa-book\" aria-hidden=\"true\"></i><strong> BookaBook</strong></a>\n    <ul class=\"navbar-nav mr-auto mt-2 mt-lg-0\" *ngIf=\"isLoggedIn\">\n      <li class=\"nav-item\" [ngClass]=\"{active : activeMenu === 'listings'}\" (click)=\"setActive('listings')\">\n        <a class=\"nav-link\" [routerLink]=\"['/listings']\"><i class=\"fa fa-list-ul\" aria-hidden=\"true\"></i> Listings <span class=\"sr-only\">(current)</span></a>\n      </li>\n      <li class=\"nav-item\" [ngClass]=\"{active : activeMenu == 'add'}\" (click)=\"setActive('add')\">\n        <a class=\"nav-link\" [routerLink]=\"['/listings/add']\"><i class=\"fa fa-plus-square-o\" aria-hidden=\"true\"></i> Add listing</a>\n      </li>\n      <li class=\"nav-item\" [ngClass]=\"{active : activeMenu === 'my'}\" (click)=\"setActive('my')\">\n        <a class=\"nav-link\" [routerLink]=\"['/mylistings']\"><i class=\"fa fa-bookmark-o\" aria-hidden=\"true\"></i> My Listings</a>\n      </li>\n      <li class=\"nav-item\" [ngClass]=\"{active : activeMenu === 'wishlist'}\" (click)=\"setActive('wishlist')\">\n        <a class=\"nav-link\" [routerLink]=\"['/wishlist']\"><i class=\"fa fa-heart\" aria-hidden=\"true\"></i> Wishlist</a>\n      </li>\n      <li class=\"nav-item\" [ngClass]=\"{active : activeMenu === 'messages'}\" (click)=\"setActive('messages')\">\n        <a class=\"nav-link\" [routerLink]=\"['/messages']\"><i class=\"fa fa-comments\" aria-hidden=\"true\"></i> Messages</a>\n      </li>\n    </ul>\n    <form class=\"form-inline my-2 my-lg-0\" *ngIf=\"isLoggedIn && !(activeMenu === 'messages') && !(activeMenu === 'add')\">\n      <input class=\"form-control mr-sm-2\" type=\"search\" placeholder=\"Search by book or author\" aria-label=\"Search\" name=\"search\" [(ngModel)]=\"currentText\" (keyup)=\"change($event)\">\n      <button class=\"btn btn-outline-success my-2 my-sm-0\" type=\"submit\" style=\"margin-right: 1rem;\">Search</button>\n    </form>\n    <button *ngIf=\"isLoggedIn\" class=\"btn btn-outline-dark\" [routerLink]=\"['/logout']\">Logout</button>\n  </div>\n</nav>\n"

/***/ }),

/***/ "./src/app/header/header.component.ts":
/*!********************************************!*\
  !*** ./src/app/header/header.component.ts ***!
  \********************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_user_id_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_services/user-id.service */ "./src/app/_services/user-id.service.ts");
/* harmony import */ var _services_auth_guard_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_services/auth-guard.service */ "./src/app/_services/auth-guard.service.ts");
/* harmony import */ var _services_inp_text_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_services/inp-text.service */ "./src/app/_services/inp-text.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(userService, authService, textService, router) {
        var _this = this;
        this.userService = userService;
        this.authService = authService;
        this.textService = textService;
        this.router = router;
        this.isLoggedIn = false;
        this.activeMenu = 'listings';
        this.currentText = '';
        authService.isLoggendIn.subscribe(function (state) {
            _this.isLoggedIn = state;
        });
    }
    HeaderComponent.prototype.ngOnInit = function () {
        if (window.location.pathname == "/listings/add") {
            this.activeMenu = 'add';
            console.log(window.location.pathname);
        }
        if (window.location.pathname == "/messages") {
            this.activeMenu = 'messages';
        }
        if (window.location.pathname == "/wishlist") {
            this.activeMenu = 'wishlist';
        }
        if (window.location.pathname == "/mylistings") {
            this.activeMenu = 'messmyages';
        }
        if (window.location.pathname == "/mylistings") {
            this.activeMenu = 'listings';
        }
    };
    HeaderComponent.prototype.setActive = function (item) {
        this.activeMenu = item;
    };
    HeaderComponent.prototype.change = function () {
        this.textService.sendText(this.currentText);
    };
    HeaderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-header',
            template: __webpack_require__(/*! ./header.component.html */ "./src/app/header/header.component.html"),
            styles: [__webpack_require__(/*! ./header.component.css */ "./src/app/header/header.component.css")]
        }),
        __metadata("design:paramtypes", [_services_user_id_service__WEBPACK_IMPORTED_MODULE_1__["UserIdService"], _services_auth_guard_service__WEBPACK_IMPORTED_MODULE_2__["AuthGuardService"], _services_inp_text_service__WEBPACK_IMPORTED_MODULE_3__["InpTextService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/app/listing/listing.component.css":
/*!***********************************************!*\
  !*** ./src/app/listing/listing.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".gallery-wrap .img-big-wrap img {\n  width: 100%;\n  height: auto;\n  display: inline-block;\n  cursor: zoom-in;\n}\n.container {\n  margin-top: 5rem;\n}\nimg {\n  margin-top: 4rem;\n}\n"

/***/ }),

/***/ "./src/app/listing/listing.component.html":
/*!************************************************!*\
  !*** ./src/app/listing/listing.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"container\">\n  <div class=\"card\">\n    <div class=\"row\">\n      <aside class=\"col-sm-5 border-right\">\n        <article class=\"gallery-wrap\">\n          <div class=\"img-big-wrap\">\n            <img src=\"{{ item.imgUrl }}\">\n          </div>\n        </article>\n      </aside>\n      <aside class=\"col-sm-7\">\n        <article class=\"card-body p-5\">\n          <h3 class=\"title mb-3\">{{ item.bookName }}</h3>\n          <p class=\"price-detail-wrap\">\n            <span class=\"price h3 text-warning\">\n              <span class=\"currency\">Rs. </span><span class=\"num\">{{ item.price }}</span>\n            </span>\n          </p>\n          <dl class=\"item-property\">\n            <dt>Product Id - </dt>\n            <dd># {{ item.id }}</dd>\n          </dl>\n          <dl class=\"param param-feature\">\n            <dt>Author</dt>\n            <dd>{{ item.authorName }}</dd>\n          </dl>\n          <dl class=\"param param-feature\">\n            <dt>Condition</dt>\n            <dd>{{ item.condition }}</dd>\n          </dl>\n          <dl class=\"param param-feature\">\n            <dt>Seller </dt>\n            <dd>{{ sellerName }}</dd>\n          </dl>\n          <button type=\"button\" class=\"btn btn-lg btn-info\" data-toggle=\"modal\" data-target=\"#exampleModal\" style=\"margin-right: 2rem;\">Contact Seller </button>\n          <button class=\"btn btn-lg btn-info\" id=\"{{ item.id }}\" (click)=\"addToWishlist($event)\">Add to Wishlist <i class=\"fa fa-heart\"></i></button>\n\n          <div class=\"modal fade\" id=\"exampleModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\n            <div class=\"modal-dialog\" role=\"document\">\n              <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                  <h5 class=\"modal-title\" id=\"exampleModalLabel\">New message</h5>\n                  <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                    <span aria-hidden=\"true\">&times;</span>\n                  </button>\n                </div>\n                <div class=\"modal-body\">\n                  <form>\n                    <div class=\"form-group\">\n                      <label for=\"recipient-name\" class=\"col-form-label\">Recipient:</label>\n                      <input type=\"text\" class=\"form-control\" id=\"recipient-name\" placeholder=\"{{sellerName}}\" disabled>\n                    </div>\n                    <div class=\"form-group\">\n                      <label for=\"message-text\" class=\"col-form-label\">Message:</label>\n                      <textarea class=\"form-control\" id=\"message-text\" name=\"mssg\" [(ngModel)]=\"textMessage\" style=\"height: 7rem;\"></textarea>\n                    </div>\n                  </form>\n                </div>\n                <div class=\"modal-footer\">\n                  <button type=\"button\" class=\"btn btn-outline-dark\" data-dismiss=\"modal\">Close</button>\n                  <button type=\"button\" class=\"btn btn-outline-info\" (click)=\"send()\" data-dismiss=\"modal\">Send message</button>\n                </div>\n              </div>\n            </div>\n          </div>\n        </article>\n      </aside>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/listing/listing.component.ts":
/*!**********************************************!*\
  !*** ./src/app/listing/listing.component.ts ***!
  \**********************************************/
/*! exports provided: ListingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListingComponent", function() { return ListingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_user_id_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_services/user-id.service */ "./src/app/_services/user-id.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ListingComponent = /** @class */ (function () {
    function ListingComponent(route, router, http, userIdService) {
        this.route = route;
        this.router = router;
        this.http = http;
        this.userIdService = userIdService;
        this.item = '';
        this.id = 1;
        this.textMessage = '';
        this.userName = '';
        this.authToken = this.userIdService.getToken();
        this.headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]()
            .set('Authorization', this.authToken)
            .set('Content-Type', 'application/json');
    }
    ListingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        this.http.get('http://localhost:2000/listings/' + this.id, { headers: this.headers }).subscribe(function (data) {
            _this.item = data;
            _this.userId = _this.userIdService.getUserId();
            _this.sellerId = _this.item.seller;
            _this.http.get('http://localhost:2000/details/' + _this.userId, { headers: _this.headers }).subscribe(function (userDetails) {
                _this.userEmail = userDetails['email'];
                _this.userName = userDetails['name'];
            });
            _this.http.get('http://localhost:2000/details/' + _this.sellerId, { headers: _this.headers }).subscribe(function (sellerDetails) {
                _this.sellerEmail = sellerDetails['email'];
                _this.sellerName = sellerDetails['name'];
            });
        });
    };
    ListingComponent.prototype.addToWishlist = function ($event) {
        var bookId = parseInt($event.target.id);
        var userId = parseInt(localStorage.getItem('userId'));
        var obj = { bookid: bookId, userid: userId };
        this.http.post('http://localhost:2000/addtowishlist', obj, {
            headers: this.headers
        }).subscribe(function (data) {
            if (data['status'] == 'success') {
                alert('Item added to Wishlist Successfully!');
            }
        });
    };
    ListingComponent.prototype.send = function () {
        var obj = { to: this.sellerId, from: this.userId, senderName: this.userName,
            senderEmail: this.userEmail, recieverName: this.sellerName, recieverEmail: this.sellerEmail,
            text: this.textMessage, productId: this.id };
        if (this.sellerId == this.userId) {
            alert("Sender and Recipient can't be same");
            return;
        }
        this.http.post('http://localhost:2000/message', obj, {
            headers: this.headers
        }).subscribe(function (data) {
            if (data['status'] == 'success') {
                alert('Message Sent Successfully!');
            }
        });
    };
    ListingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-listing',
            template: __webpack_require__(/*! ./listing.component.html */ "./src/app/listing/listing.component.html"),
            styles: [__webpack_require__(/*! ./listing.component.css */ "./src/app/listing/listing.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
            _services_user_id_service__WEBPACK_IMPORTED_MODULE_3__["UserIdService"]])
    ], ListingComponent);
    return ListingComponent;
}());



/***/ }),

/***/ "./src/app/listings/listings.component.css":
/*!*************************************************!*\
  !*** ./src/app/listings/listings.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n@import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');\n\n.btn-primary:hover,\n.btn-primary:focus {\n  background-color: #108d6f;\n  border-color: #108d6f;\n  box-shadow: none;\n  outline: none;\n}\n\n.btn-primary {\n  color: #fff;\n}\n\nsection {\n  padding: 60px 0;\n\n}\n\nsection .section-title {\n  text-align: center;\n  color: #0099ff;\n  margin-bottom: 50px;\n  text-transform: uppercase;\n}\n\n#team .card {\n  border: none;\n  background: #ffffff;\n}\n\n.image-flip:hover .backside,\n.image-flip.hover .backside {\n  -webkit-transform: rotateY(0deg);\n  transform: rotateY(0deg);\n  border-radius: .25rem;\n}\n\n.image-flip:hover .frontside,\n.image-flip.hover .frontside {\n  -webkit-transform: rotateY(180deg);\n  transform: rotateY(180deg);\n}\n\n.mainflip {\n  -webkit-transition: 1s;\n  -webkit-transform-style: preserve-3d;\n  -ms-transition: 1s;\n  -moz-transition: 1s;\n  -moz-transform: perspective(1000px);\n  -moz-transform-style: preserve-3d;\n  -ms-transform-style: preserve-3d;\n  transition: 1s;\n  transform-style: preserve-3d;\n  position: relative;\n}\n\n.frontside {\n  position: relative;\n  -webkit-transform: rotateY(0deg);\n  -ms-transform: rotateY(0deg);\n  z-index: 2;\n  margin-bottom: 30px;\n}\n\n.backside {\n  position: absolute;\n  top: 0;\n  left: 0;\n  background: white;\n  -webkit-transform: rotateY(-180deg);\n  transform: rotateY(-180deg);\n  box-shadow: 5px 7px 9px -4px rgb(158, 158, 158);\n}\n\n.frontside,\n.backside {\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  -webkit-transition: 1s;\n  -webkit-transform-style: preserve-3d;\n  -moz-transition: 1s;\n  -moz-transform-style: preserve-3d;\n  -o-transition: 1s;\n  -o-transform-style: preserve-3d;\n  -ms-transition: 1s;\n  -ms-transform-style: preserve-3d;\n  transition: 1s;\n  transform-style: preserve-3d;\n}\n\n.frontside .card,\n.backside .card {\n  min-height: 312px;\n  min-width: 350px;\n}\n\n.backside .card a {\n  font-size: 18px;\n  color: #007b5e !important;\n}\n\n.frontside .card .card-title,\n.backside .card .card-title {\n  color: #00ccff !important;\n}\n\n.frontside .card .card-body img {\n  width: 120px;\n  height: 120px;\n  border-radius: 50%;\n}\n\nimg {\n  border-radius: 5% !important;\n}\n\n.fa-plus {\n  color: white;\n}\n\n\n\n"

/***/ }),

/***/ "./src/app/listings/listings.component.html":
/*!**************************************************!*\
  !*** ./src/app/listings/listings.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section id=\"team\" class=\"pb-5\">\n  <div class=\"container\">\n    <div style=\"margin-bottom: 2rem;\">\n      <span>Filters: </span>\n      <div class=\"form-check form-check-inline row\">\n        <div class=\"form-check col-sm-6\">\n          <label class=\"form-check-label\" for=\"price\">\n            <input [(ngModel)]=\"priceBoxValue\" (change)=\"setPriceFilter(priceBoxValue)\" type=\"checkbox\" class=\"form-check-input\" name=\"price\" id=\"price\"> Price\n          </label>\n        </div>\n        <div class=\"form-check col-sm-6\">\n          <label class=\"form-check-label\" for=\"condition\">\n            <input [(ngModel)]=\"conditionBoxValue\" (change)=\"setConditionFilter(conditionBoxValue)\" type=\"checkbox\" class=\"form-check-input\" name=\"condition\" id=\"condition\"> Condition\n          </label>\n        </div>\n        <div class=\"form-check col-sm-6\">\n          <label class=\"form-check-label\" for=\"sortPrice\">\n            <input [(ngModel)]=\"sortPrice\" (change)=\"setSortPrice(sortPrice)\" type=\"checkbox\" class=\"form-check-input\" name=\"sortPrice\" id=\"sortPrice\"> Sort By Price\n          </label>\n        </div>\n        <div class=\"form-check col-sm-6\">\n          <label class=\"form-check-label\" for=\"sortCondition\">\n            <input [(ngModel)]=\"sortCondition\" (change)=\"setSortCondition(sortCondition)\" type=\"checkbox\" class=\"form-check-input\" name=\"sortCondition\" id=\"sortCondition\"> Sort By Condition\n          </label>\n        </div>\n      </div>\n      <span *ngIf=\"showPriceFilter\" style=\"margin-right: 1rem\">\n        <label class=\"form-check-label\" for=\"min\" style=\"margin-left: 1rem;margin-right: 0.5rem;\">Min</label>\n        <input [(ngModel)] = 'minPrice' style=\"width: 5em;\" id=\"min\">\n        <label class=\"form-check-label\" for=\"min\" style=\"margin-left: 1rem;margin-right: 0.5rem;\">Max</label>\n        <input [(ngModel)] = 'maxPrice' style=\"width: 5em;\" id=\"max\">\n      </span>\n      <select class=\"selectpicker\" [(ngModel)]=\"selectedCond\" *ngIf=\"showConditionFilter\" (ngModelChange)=\"selectedCondition($event)\" style=\"margin-left: 1rem;margin-right: 1rem;\"  >\n        <option *ngFor=\"let c of conditions\" [ngValue]=\"c\"> {{c}} </option>\n      </select>\n      <button (click)=\"reset()\" class=\"btn btn-outline-primary\">Reset</button>\n    </div>\n    <div class=\"row\">\n      <div class=\"col-xs-12 col-sm-6 col-md-4\" *ngFor=\"let item of filter(items)\">\n        <div class=\"image-flip\" ontouchstart=\"this.classList.toggle('hover');\">\n          <div class=\"mainflip\">\n            <div class=\"frontside\">\n              <div class=\"card\">\n                <div class=\"card-body text-center\">\n                  <p><img class=\"img-fluid\" src=\"{{ item.imgUrl }}\" alt=\"card image\"></p>\n                  <h4 class=\"card-title\"><strong>{{ item.bookName }}</strong></h4>\n                  <p class=\"card-text\"><strong>Price</strong> - Rs.{{ item.price }}</p>\n                  <button class=\"btn btn-outline-info btn-sm\" id=\"{{ item.id }}\" (click)=\"addToWishlist($event)\"><i class=\"fa fa-heart\"></i></button>\n                </div>\n              </div>\n            </div>\n            <div class=\"backside\">\n              <div class=\"card\">\n                <div class=\"card-body text-center mt-4\">\n                  <h4 class=\"card-title\">{{ item.bookName }}</h4>\n                  <p class=\"card-text\" align=\"left\" style=\"margin-left: 4rem; margin-top: 2rem;\">\n                    <span><strong>Author:</strong> {{ item.authorName }} </span><br>\n                    <span><strong>Price:</strong> {{ item.price}}</span><br>\n                    <span><strong>Condition:</strong> {{ item.condition }}</span><br>\n                  </p>\n                  <ul class=\"list-inline\" style=\"margin-top: 4rem;\">\n                    <li class=\"list-inline-item\">\n                      <button class=\"btn btn-warning\" id=\"{{ item.id }}\" (click)=\"showDetail($event)\">View Details</button>\n                    </li>\n                    <li class=\"list-inline-item\">\n                      <button class=\"btn btn-info\" id=\"{{ item.id }}\" (click)=\"addToWishlist($event)\">Add to Wishlist <i class=\"fa fa-heart\"></i></button>\n                    </li>\n                  </ul>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</section>\n"

/***/ }),

/***/ "./src/app/listings/listings.component.ts":
/*!************************************************!*\
  !*** ./src/app/listings/listings.component.ts ***!
  \************************************************/
/*! exports provided: ListingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListingsComponent", function() { return ListingsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_inp_text_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_services/inp-text.service */ "./src/app/_services/inp-text.service.ts");
/* harmony import */ var _services_user_id_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_services/user-id.service */ "./src/app/_services/user-id.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ListingsComponent = /** @class */ (function () {
    // c: string = '';
    function ListingsComponent(route, router, http, textSerice, userIdService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.http = http;
        this.textSerice = textSerice;
        this.userIdService = userIdService;
        this.items = '';
        this.text = '';
        this.options = ['Price', 'Condition'];
        this.conditions = ['New', 'Almost New', 'Slighlty Damaged', 'Worn'];
        this.minPrice = 0;
        this.maxPrice = 10000000;
        this.condition = '';
        this.showPriceFilter = false;
        this.showConditionFilter = false;
        this.selectedFiler = 'Price';
        this.authToken = this.userIdService.getToken();
        this.textSerice.searchText.subscribe(function (data) {
            _this.text = data;
        });
    }
    ListingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.selectedCond = 'New';
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]()
            .set('Authorization', this.authToken)
            .set('Content-Type', 'application/json');
        this.http.get('http://localhost:2000/listings', { headers: headers }).subscribe(function (data) {
            _this.items = data;
        });
    };
    ListingsComponent.prototype.showDetail = function ($event) {
        var id = parseInt($event.target.id);
        this.router.navigate((['listings/' + id]));
    };
    ListingsComponent.prototype.addToWishlist = function ($event) {
        var bookId = parseInt($event.target.id);
        var userId = parseInt(localStorage.getItem('userId'));
        var obj = { bookid: bookId, userid: userId };
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]()
            .set('Authorization', this.authToken)
            .set('Content-Type', 'application/json');
        this.http.post('http://localhost:2000/addtowishlist', obj, {
            headers: headers
        }).subscribe(function (data) {
            if (data['status'] == 'success') {
                alert('Item added to Wishlist Successfully!');
            }
        });
    };
    ListingsComponent.prototype.filter = function (items) {
        var _this = this;
        var arr = [];
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            if (item != undefined) {
                if (item.bookName.toLowerCase().includes(this.text.toLowerCase()) || item.authorName.toLowerCase().includes(this.text.toLowerCase())) {
                    if (parseInt(item.price) >= this.minPrice && parseInt(item.price) <= this.maxPrice)
                        if (this.showConditionFilter) {
                            if (item.condition == this.condition || this.condition == '') {
                                arr.push(item);
                            }
                        }
                        else
                            arr.push(item);
                }
            }
        }
        if (this.sortPrice) {
            arr.sort(function (a, b) { return (a.price - b.price); });
        }
        if (this.sortCondition) {
            arr.sort(function (a, b) { return (_this.conditions.indexOf(a.condition) - _this.conditions.indexOf(b.condition)); });
        }
        if (this.sortCondition && this.sortPrice) {
            arr.sort(function (a, b) {
                if (a.price != b.price) {
                    return a.price - b.price;
                }
                return _this.conditions.indexOf(a.condition) - _this.conditions.indexOf(b.condition);
            });
        }
        return arr;
    };
    ListingsComponent.prototype.setPriceFilter = function (filter) {
        this.showPriceFilter = filter;
    };
    ListingsComponent.prototype.setConditionFilter = function (filter) {
        this.showConditionFilter = filter;
    };
    ListingsComponent.prototype.selectedCondition = function (condition) {
        this.condition = condition;
    };
    ListingsComponent.prototype.setSortPrice = function (sortPrice) {
        this.sortPrice = sortPrice;
    };
    ListingsComponent.prototype.setSortCondition = function (sortCondition) {
        this.sortCondition = sortCondition;
    };
    ListingsComponent.prototype.reset = function () {
        this.showConditionFilter = false;
        this.showPriceFilter = false;
        this.condition = '';
        this.minPrice = 0;
        this.maxPrice = 1000000;
        this.priceBoxValue = false;
        this.conditionBoxValue = false;
        this.sortPrice = false;
        this.sortCondition = false;
    };
    ListingsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-listings',
            template: __webpack_require__(/*! ./listings.component.html */ "./src/app/listings/listings.component.html"),
            styles: [__webpack_require__(/*! ./listings.component.css */ "./src/app/listings/listings.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
            _services_inp_text_service__WEBPACK_IMPORTED_MODULE_3__["InpTextService"],
            _services_user_id_service__WEBPACK_IMPORTED_MODULE_4__["UserIdService"]])
    ], ListingsComponent);
    return ListingsComponent;
}());



/***/ }),

/***/ "./src/app/login-signup/login-signup.component.css":
/*!*********************************************************!*\
  !*** ./src/app/login-signup/login-signup.component.css ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "body{\n  margin:0;\n  color:#6a6f8c;\n  background:#c8c8c8;\n  font:600 16px/18px 'Open Sans',sans-serif;\n}\n*,:after,:before{box-sizing:border-box}\n.clearfix:after,.clearfix:before{content:'';display:table}\n.clearfix:after{clear:both;display:block}\na{color:inherit;text-decoration:none}\n.login-wrap{\n  width:100%;\n  margin:auto;\n  max-width:525px;\n  min-height:670px;\n  position:relative;\n  background:url(https://raw.githubusercontent.com/khadkamhn/day-01-login-form/master/img/bg.jpg) no-repeat center;\n  box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19);\n}\n.login-html{\n  width:100%;\n  height:100%;\n  position:absolute;\n  padding:90px 70px 50px 70px;\n  background:rgba(40,57,101,.9);\n}\n.login-html .sign-in-htm,\n.login-html .sign-up-htm{\n  top:0;\n  left:0;\n  right:0;\n  bottom:0;\n  position:absolute;\n  -webkit-transform:rotateY(180deg);\n          transform:rotateY(180deg);\n  -webkit-backface-visibility:hidden;\n          backface-visibility:hidden;\n  transition:all .4s linear;\n}\n.login-html .sign-in,\n.login-html .sign-up,\n.login-form .group .check{\n  display:none;\n}\n.login-html .tab,\n.login-form .group .label,\n.login-form .group .button{\n  text-transform:uppercase;\n}\n.login-html .tab{\n  font-size:22px;\n  margin-right:15px;\n  padding-bottom:5px;\n  margin:0 15px 10px 0;\n  display:inline-block;\n  border-bottom:2px solid transparent;\n}\n.login-html .sign-in:checked + .tab,\n.login-html .sign-up:checked + .tab{\n  color:#fff;\n  border-color:#1161ee;\n}\n.login-form{\n  min-height:345px;\n  position:relative;\n  -webkit-perspective:1000px;\n          perspective:1000px;\n  -webkit-transform-style:preserve-3d;\n          transform-style:preserve-3d;\n}\n.login-form .group{\n  margin-bottom:15px;\n}\n.login-form .group .label,\n.login-form .group .input,\n.login-form .group .button{\n  width:100%;\n  color:#fff;\n  display:block;\n}\n.login-form .group .input,\n.login-form .group .button{\n  border:none;\n  padding:15px 20px;\n  border-radius:25px;\n  background:rgba(255,255,255,.1);\n}\n.login-form .group input[data-type=\"password\"]{\n  text-security:circle;\n  -webkit-text-security:circle;\n}\n.login-form .group .label{\n  color:#aaa;\n  font-size:12px;\n}\n.login-form .group .button{\n  background:#1161ee;\n}\n.login-form .group label .icon{\n  width:15px;\n  height:15px;\n  border-radius:2px;\n  position:relative;\n  display:inline-block;\n  background:rgba(255,255,255,.1);\n}\n.login-form .group label .icon:before,\n.login-form .group label .icon:after{\n  content:'';\n  width:10px;\n  height:2px;\n  background:#fff;\n  position:absolute;\n  transition:all .2s ease-in-out 0s;\n}\n.login-form .group label .icon:before{\n  left:3px;\n  width:5px;\n  bottom:6px;\n  -webkit-transform:scale(0) rotate(0);\n          transform:scale(0) rotate(0);\n}\n.login-form .group label .icon:after{\n  top:6px;\n  right:0;\n  -webkit-transform:scale(0) rotate(0);\n          transform:scale(0) rotate(0);\n}\n.login-form .group .check:checked + label{\n  color:#fff;\n}\n.login-form .group .check:checked + label .icon{\n  background:#1161ee;\n}\n.login-form .group .check:checked + label .icon:before{\n  -webkit-transform:scale(1) rotate(45deg);\n          transform:scale(1) rotate(45deg);\n}\n.login-form .group .check:checked + label .icon:after{\n  -webkit-transform:scale(1) rotate(-45deg);\n          transform:scale(1) rotate(-45deg);\n}\n.login-html .sign-in:checked + .tab + .sign-up + .tab + .login-form .sign-in-htm{\n  -webkit-transform:rotate(0);\n          transform:rotate(0);\n}\n.login-html .sign-up:checked + .tab + .login-form .sign-up-htm{\n  -webkit-transform:rotate(0);\n          transform:rotate(0);\n}\n#submitbtn {\n  margin-bottom: 0px;\n}\n.hr{\n  height:2px;\n  margin:60px 0 50px 0;\n  background:rgba(255,255,255,.2);\n}\n.foot-lnk{\n  text-align:center;\n}\n"

/***/ }),

/***/ "./src/app/login-signup/login-signup.component.html":
/*!**********************************************************!*\
  !*** ./src/app/login-signup/login-signup.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"login-wrap\">\n  <div class=\"login-html\">\n    <input id=\"tab-1\" type=\"radio\" name=\"tab\" class=\"sign-in\" checked><label for=\"tab-1\" class=\"tab\">Sign In</label>\n    <input id=\"tab-2\" type=\"radio\" name=\"tab\" class=\"sign-up\"><label for=\"tab-2\" class=\"tab\">Sign Up</label>\n    <div class=\"login-form\">\n      <div class=\"sign-in-htm\">\n        <div class=\"group\">\n          <label for=\"user\" class=\"label\">Username</label>\n          <input id=\"user\" type=\"text\" class=\"input\" [(ngModel)]=\"loginemail\">\n        </div>\n        <div class=\"group\">\n          <label for=\"pass\" class=\"label\">Password</label>\n          <input id=\"pass\" type=\"password\" class=\"input\" data-type=\"password\" [(ngModel)]=\"loginpass\" (keyup)=\"chk($event)\">\n        </div>\n        <div class=\"group\">\n          <input id=\"check\" type=\"checkbox\" class=\"check\" checked>\n          <label for=\"check\"><span class=\"icon\"></span> Keep me Signed in</label>\n        </div>\n        <div class=\"group\">\n          <input type=\"submit\" (click)=\"login()\" class=\"button\" value=\"Sign In\">\n        </div>\n        <div class=\"hr\"></div>\n      </div>\n\n      <div class=\"sign-up-htm\">\n        <div class=\"group\">\n          <label for=\"name\" class=\"label\">Name</label>\n          <input id=\"name\" type=\"text\" class=\"input\" [(ngModel)]=\"name\">\n        </div>\n        <div class=\"group\">\n          <label for=\"email\" class=\"label\">Email</label>\n          <input id=\"email\" type=\"text\" class=\"input\" [(ngModel)]=\"email\">\n        </div>\n        <div class=\"group\">\n          <label for=\"password\" class=\"label\">Password</label>\n          <input id=\"password\" type=\"password\" class=\"input\" [(ngModel)]=\"password\">\n        </div>\n        <div class=\"group\">\n          <label for=\"college\" class=\"label\">College</label>\n          <input id=\"college\" type=\"text\" class=\"input\" [(ngModel)]=\"college\">\n        </div>\n        <div class=\"group\">\n          <label for=\"phone\" class=\"label\">Phone</label>\n          <input id=\"phone\" type=\"text\" class=\"input\" [(ngModel)]=\"phone\">\n        </div>\n        <div class=\"group\" id=\"submitbtn\">\n          <input type=\"submit\" (click)=\"signup()\" class=\"button\" value=\"Sign Up\">\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/login-signup/login-signup.component.ts":
/*!********************************************************!*\
  !*** ./src/app/login-signup/login-signup.component.ts ***!
  \********************************************************/
/*! exports provided: LoginSignupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginSignupComponent", function() { return LoginSignupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginSignupComponent = /** @class */ (function () {
    function LoginSignupComponent(formBuilder, route, router, http) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.http = http;
        this.loginemail = '';
        this.loginpass = '';
        this.name = '';
        this.email = '';
        this.password = '';
        this.college = '';
        this.phone = '';
        this.address = 'ggsipu';
        this.invalid = false;
        this.valid = true;
        this.afuConfig = {
            uploadAPI: {
                url: "http://localhost:2000/upload"
            }
        };
    }
    LoginSignupComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('token') != undefined) {
            this.router.navigate(['listings']);
        }
    };
    LoginSignupComponent.prototype.login = function () {
        var _this = this;
        var obj = { email: this.loginemail, password: this.loginpass };
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]()
            .set('Authorization', 'my-auth-token')
            .set('Content-Type', 'application/json');
        this.http.post('http://localhost:2000/login', obj, {
            headers: headers
        }).subscribe(function (data) {
            if (data) {
                window.localStorage.setItem('jwt_token', data['token']);
                window.localStorage.setItem('userId', data['id']);
                _this.router.navigate(['listings']);
            }
            else {
                alert('Invalid Credentials!');
            }
        });
    };
    LoginSignupComponent.prototype.chk = function (event) {
        if (event.keyCode == 13) {
            this.login();
        }
    };
    LoginSignupComponent.prototype.signup = function () {
        var _this = this;
        this.valid = true;
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]()
            .set('Authorization', 'my-auth-token')
            .set('Content-Type', 'application/json');
        var obj = { name: this.name, password: this.password, email: this.email, college: this.college, address: this.address, phone: this.phone };
        if (this.name.length == 0) {
            alert("Name Can't be Empty!");
            this.valid = false;
        }
        else if (this.email.length == 0) {
            alert("Email Can't be Empty!");
            this.valid = false;
        }
        else if (this.password.length == 0) {
            alert("Password Can't be Empty!");
            this.valid = false;
        }
        else if (this.phone.length != 10) {
            alert("Phone number must be 10 digits!");
            this.valid = false;
        }
        else if (isNaN(parseInt(this.phone))) {
            alert("Phone number should only contain digits!");
            this.valid = false;
        }
        if (this.valid) {
            this.http.post('http://localhost:2000/signup', obj, {
                headers: headers
            }).subscribe(function (data) {
                // console.log('==========');
                if (data['status'] == 'success') {
                    // console.log(data);
                    window.localStorage.setItem('jwt_token', data['token']);
                    window.localStorage.setItem('userId', data['id']);
                    _this.router.navigate(['listings']);
                }
                else if (data['status'] == 'email') {
                    alert('Email Already Registered!');
                }
                else {
                    console.log(data);
                }
            });
        }
    };
    LoginSignupComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login-signup',
            template: __webpack_require__(/*! ./login-signup.component.html */ "./src/app/login-signup/login-signup.component.html"),
            styles: [__webpack_require__(/*! ./login-signup.component.css */ "./src/app/login-signup/login-signup.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], LoginSignupComponent);
    return LoginSignupComponent;
}());



/***/ }),

/***/ "./src/app/messages/messages.component.css":
/*!*************************************************!*\
  !*** ./src/app/messages/messages.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n@import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');\n\n.card {\n  margin-top: 3rem;\n}\n"

/***/ }),

/***/ "./src/app/messages/messages.component.html":
/*!**************************************************!*\
  !*** ./src/app/messages/messages.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div style=\"margin-top: 2rem;\">\n    <button style=\"display: inline;margin-right: 2rem;\" class=\"btn btn-info\" (click)=\"ngOnInit()\">Recieved</button>\n    <button style=\"display: inline\" class=\"btn btn-info\" (click)=\"sent()\">Sent</button>\n  </div>\n\n  <div class=\"card\" *ngFor=\"let message of messages\">\n    <div class=\"card-header\">\n        <span *ngIf=\"message.from != userId\" style=\"display:inline;\"><strong>From:</strong> {{ message.senderName }}</span>\n        <span *ngIf=\"message.from == userId\" style=\"display:inline;\"><strong>To:</strong> {{ message.recieverName }}</span>\n        <span *ngIf=\"message.from != userId\" style=\"display:inline;float: right;\"><strong>Recieved at:</strong> {{ message.createdAt.split('T')[0] + \" \" + message.createdAt.split('T')[1]}}</span>\n        <span *ngIf=\"message.from == userId\" style=\"display:inline;float: right;\"><strong>Sent at:</strong> {{ message.createdAt.split('T')[0] + \" \" + message.createdAt.split('T')[1]}}</span>\n    </div>\n    <div class=\"card-body\">\n      <p><button class=\"btn btn-outline-info btn-sm\" (click)=product(message.id)>Product Link</button></p>\n      <p class=\"card-text\"><strong>Message - </strong>{{ message.text }}</p>\n      <button *ngIf=\"message.from != userId\" class=\"btn btn-outline-info\" data-toggle=\"modal\" data-target=\"#exampleModal\" style=\"margin-right: 2rem;\">Reply <i class=\"fa fa-reply\" aria-hidden=\"true\"></i></button>\n      <button *ngIf=\"message.from != userId\" class=\"btn btn-outline-danger\" (click)=\"delete(message.id)\">Delete <i class=\"fa fa-trash\" aria-hidden=\"true\"></i></button>\n      <div class=\"modal fade\" id=\"exampleModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\n        <div class=\"modal-dialog\" role=\"document\">\n          <div class=\"modal-content\">\n            <div class=\"modal-header\">\n              <h5 class=\"modal-title\" id=\"exampleModalLabel\">New message</h5>\n              <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                <span aria-hidden=\"true\">&times;</span>\n              </button>\n            </div>\n            <div class=\"modal-body\">\n              <form>\n                <div class=\"form-group\">\n                  <label for=\"recipient-name\" class=\"col-form-label\">Recipient:</label>\n                  <input type=\"text\" class=\"form-control\" id=\"recipient-name\" placeholder=\"{{ message.senderName }}\" disabled>\n                </div>\n                <div class=\"form-group\">\n                  <label for=\"message-text\" class=\"col-form-label\">Message:</label>\n                  <textarea class=\"form-control\" id=\"message-text\" name=\"mssg\" [(ngModel)]=\"textMessage\" style=\"height: 7rem;\"></textarea>\n                </div>\n              </form>\n            </div>\n            <div class=\"modal-footer\">\n              <button type=\"button\" class=\"btn btn-outline-dark\" data-dismiss=\"modal\">Close</button>\n              <button type=\"button\" class=\"btn btn-outline-info\" id=\"{{ message.from }}\" (click)=\"send({event:$event,id:message.productId})\" data-dismiss=\"modal\">Send message</button>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/messages/messages.component.ts":
/*!************************************************!*\
  !*** ./src/app/messages/messages.component.ts ***!
  \************************************************/
/*! exports provided: MessagesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessagesComponent", function() { return MessagesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _services_user_id_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_services/user-id.service */ "./src/app/_services/user-id.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MessagesComponent = /** @class */ (function () {
    function MessagesComponent(route, router, http, userIdService) {
        this.route = route;
        this.router = router;
        this.http = http;
        this.userIdService = userIdService;
        this.userEmail = '';
        this.userName = '';
        this.textMessage = '';
        this.recieved = true;
        this.authToken = this.userIdService.getToken();
        this.headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]()
            .set('Authorization', this.authToken)
            .set('Content-Type', 'application/json');
    }
    MessagesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.recieved = true;
        this.userId = this.userIdService.getUserId();
        this.http.get('http://localhost:2000/message/' + this.userId, { headers: this.headers }).subscribe(function (data) {
            _this.messages = data;
            _this.messages.reverse();
        });
        this.http.get('http://localhost:2000/details/' + this.userId, { headers: this.headers }).subscribe(function (userDetails) {
            _this.userEmail = userDetails['email'];
            _this.userName = userDetails['name'];
        });
    };
    MessagesComponent.prototype.send = function (objct) {
        var _this = this;
        this.reciverId = parseInt(objct.event.target.id);
        var productId = objct.id;
        this.http.get('http://localhost:2000/details/' + this.reciverId, { headers: this.headers }).subscribe(function (data) {
            _this.reciverName = data['name'];
            _this.reciverEmail = data['email'];
            var obj = { to: _this.reciverId, from: _this.userId, senderName: _this.userName,
                senderEmail: _this.userEmail, recieverName: _this.reciverName, recieverEmail: _this.reciverEmail,
                text: _this.textMessage, productId: productId };
            if (_this.reciverId == _this.userId) {
                alert("Sender and Recipient Can't be same");
                return;
            }
            _this.http.post('http://localhost:2000/message', obj, {
                headers: _this.headers
            }).subscribe(function (data) {
                if (data['status'] == 'success') {
                    alert('Message Sent Successfully!');
                }
            });
        });
    };
    MessagesComponent.prototype.sent = function () {
        var _this = this;
        this.recieved = false;
        this.http.get('http://localhost:2000/message/sent/' + this.userId, {
            headers: this.headers
        }).subscribe(function (data) {
            _this.messages = data;
            _this.messages.reverse();
        });
    };
    MessagesComponent.prototype.delete = function (id) {
        var _this = this;
        this.http.post('http://localhost:2000/message/delete', { id: id }, {
            headers: this.headers
        }).subscribe(function (data) {
            if (data['status'] == 'success') {
                _this.ngOnInit();
            }
        });
    };
    MessagesComponent.prototype.product = function (id) {
        var path = 'listings/' + id;
        this.router.navigate([path]);
    };
    MessagesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-messages',
            template: __webpack_require__(/*! ./messages.component.html */ "./src/app/messages/messages.component.html"),
            styles: [__webpack_require__(/*! ./messages.component.css */ "./src/app/messages/messages.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            _services_user_id_service__WEBPACK_IMPORTED_MODULE_3__["UserIdService"]])
    ], MessagesComponent);
    return MessagesComponent;
}());



/***/ }),

/***/ "./src/app/my-listings/my-listings.component.css":
/*!*******************************************************!*\
  !*** ./src/app/my-listings/my-listings.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n@import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');\n\n.btn-primary:hover,\n.btn-primary:focus {\n  background-color: #108d6f;\n  border-color: #108d6f;\n  box-shadow: none;\n  outline: none;\n}\n\n.btn-primary {\n  color: #fff;\n  background-color: #007b5e;\n  border-color: #007b5e;\n}\n\nsection {\n  padding: 60px 0;\n}\n\nsection .section-title {\n  text-align: center;\n  color: #007b5e;\n  margin-bottom: 50px;\n  text-transform: uppercase;\n}\n\n#team .card {\n  border: none;\n  background: #ffffff;\n}\n\n.image-flip:hover .backside,\n.image-flip.hover .backside {\n  -webkit-transform: rotateY(0deg);\n  transform: rotateY(0deg);\n  border-radius: .25rem;\n}\n\n.image-flip:hover .frontside,\n.image-flip.hover .frontside {\n  -webkit-transform: rotateY(180deg);\n  transform: rotateY(180deg);\n}\n\n.mainflip {\n  -webkit-transition: 1s;\n  -webkit-transform-style: preserve-3d;\n  -ms-transition: 1s;\n  -moz-transition: 1s;\n  -moz-transform: perspective(1000px);\n  -moz-transform-style: preserve-3d;\n  -ms-transform-style: preserve-3d;\n  transition: 1s;\n  transform-style: preserve-3d;\n  position: relative;\n}\n\n.frontside {\n  position: relative;\n  -webkit-transform: rotateY(0deg);\n  -ms-transform: rotateY(0deg);\n  z-index: 2;\n  margin-bottom: 30px;\n}\n\n.backside {\n  position: absolute;\n  top: 0;\n  left: 0;\n  background: white;\n  -webkit-transform: rotateY(-180deg);\n  transform: rotateY(-180deg);\n  box-shadow: 5px 7px 9px -4px rgb(158, 158, 158);\n}\n\n.frontside,\n.backside {\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  -webkit-transition: 1s;\n  -webkit-transform-style: preserve-3d;\n  -moz-transition: 1s;\n  -moz-transform-style: preserve-3d;\n  -o-transition: 1s;\n  -o-transform-style: preserve-3d;\n  -ms-transition: 1s;\n  -ms-transform-style: preserve-3d;\n  transition: 1s;\n  transform-style: preserve-3d;\n}\n\n.frontside .card,\n.backside .card {\n  min-height: 312px;\n  min-width: 350px;\n}\n\n.backside .card a {\n  font-size: 18px;\n  color: #007b5e !important;\n}\n\n.frontside .card .card-title,\n.backside .card .card-title {\n  color: #00ccff !important;\n}\n\n.frontside .card .card-body img {\n  width: 120px;\n  height: 120px;\n  border-radius: 50%;\n}\n\nimg {\n  border-radius: 5% !important;\n}\n\n.fa-plus {\n  color: white;\n}\n"

/***/ }),

/***/ "./src/app/my-listings/my-listings.component.html":
/*!********************************************************!*\
  !*** ./src/app/my-listings/my-listings.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section id=\"team\" class=\"pb-5\">\n  <div class=\"container\">\n    <div style=\"margin-bottom: 2rem;\">\n      <span>Filters: </span>\n      <div class=\"form-check-inline row\">\n        <div class=\"form-check col-sm-6\">\n          <label class=\"form-check-label\" for=\"price\">\n            <input [(ngModel)]=\"priceBoxValue\" (change)=\"setPriceFilter(priceBoxValue)\" type=\"checkbox\" class=\"form-check-input\" name=\"price\" id=\"price\"> Price\n          </label>\n        </div>\n        <div class=\"form-check col-sm-6\">\n          <label class=\"form-check-label\" for=\"condition\">\n            <input [(ngModel)]=\"conditionBoxValue\" (change)=\"setConditionFilter(conditionBoxValue)\" type=\"checkbox\" class=\"form-check-input\" name=\"condition\" id=\"condition\"> Condition\n          </label>\n        </div>\n        <div class=\"form-check col-sm-6\">\n          <label class=\"form-check-label\" for=\"sortPrice\">\n            <input [(ngModel)]=\"sortPrice\" (change)=\"setSortPrice(sortPrice)\" type=\"checkbox\" class=\"form-check-input\" name=\"sortPrice\" id=\"sortPrice\"> Sort By Price\n          </label>\n        </div>\n        <div class=\"form-check col-sm-6\">\n          <label class=\"form-check-label\" for=\"sortCondition\">\n            <input [(ngModel)]=\"sortCondition\" (change)=\"setSortCondition(sortCondition)\" type=\"checkbox\" class=\"form-check-input\" name=\"sortCondition\" id=\"sortCondition\"> Sort By Condition\n          </label>\n        </div>\n      </div>\n      <span *ngIf=\"showPriceFilter\" style=\"margin-right: 1rem\">\n        <label class=\"form-check-label\" for=\"min\" style=\"margin-left: 1rem;margin-right: 0.5rem;\">Min</label>\n        <input [(ngModel)] = 'minPrice' style=\"width: 5em;\" id=\"min\">\n        <label class=\"form-check-label\" for=\"min\" style=\"margin-left: 1rem;margin-right: 0.5rem;\">Max</label>\n        <input [(ngModel)] = 'maxPrice' style=\"width: 5em;\" id=\"max\">\n      </span>\n      <select class=\"selectpicker\" [(ngModel)]=\"selectedCond\" *ngIf=\"showConditionFilter\" (ngModelChange)=\"selectedCondition($event)\" style=\"margin-left: 1rem;margin-right: 1rem;\"  >\n        <option *ngFor=\"let c of conditions\" [ngValue]=\"c\"> {{c}} </option>\n      </select>\n      <button (click)=\"reset()\" class=\"btn btn-outline-primary\">Reset</button>\n    </div>\n\n    <div class=\"row\">\n      <div class=\"col-xs-12 col-sm-6 col-md-4\" *ngFor=\"let item of filter(items)\">\n        <div class=\"image-flip\" ontouchstart=\"this.classList.toggle('hover');\">\n          <div class=\"mainflip\">\n            <div class=\"frontside\">\n              <div class=\"card\">\n                <div class=\"card-body text-center\">\n                  <p><img class=\"img-fluid\" src=\"{{ item.imgUrl }}\" alt=\"card image\"></p>\n                  <h4 class=\"card-title\"><strong>{{ item.bookName }}</strong></h4>\n                  <p class=\"card-text\"><strong>Price</strong> - Rs.{{ item.price }}</p>\n                  <p class=\"card-text\"><strong>Author</strong> - {{ item.authorName}}</p>\n                </div>\n              </div>\n            </div>\n            <div class=\"backside\">\n              <div class=\"card\">\n                <div class=\"card-body text-center mt-4\">\n                  <h4 class=\"card-title\">{{ item.bookName }}</h4>\n                  <p class=\"card-text\" align=\"left\" style=\"margin-left: 4rem; margin-top: 2rem;\">\n                    <span><strong>Author:</strong> {{ item.authorName }} </span><br>\n                    <span><strong>Price:</strong> {{ item.price}}</span><br>\n                    <span><strong>Condition:</strong> {{ item.condition }}</span><br>\n                  </p>\n                  <ul class=\"list-inline\" style=\"margin-top: 4rem;\">\n                    <li class=\"list-inline-item\">\n                      <button class=\"btn btn-warning\" id=\"{{ item.id }}\" (click)=\"showDetail($event)\">View Details</button>\n                    </li>\n                    <li class=\"list-inline-item\">\n                      <button class=\"btn btn-danger\" id=\"{{ item.id }}\" (click)=\"removeFromListings($event)\">Remove this Listing</button>\n                    </li>\n                  </ul>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</section>\n"

/***/ }),

/***/ "./src/app/my-listings/my-listings.component.ts":
/*!******************************************************!*\
  !*** ./src/app/my-listings/my-listings.component.ts ***!
  \******************************************************/
/*! exports provided: MyListingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyListingsComponent", function() { return MyListingsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _services_user_id_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_services/user-id.service */ "./src/app/_services/user-id.service.ts");
/* harmony import */ var _services_inp_text_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_services/inp-text.service */ "./src/app/_services/inp-text.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyListingsComponent = /** @class */ (function () {
    function MyListingsComponent(route, router, http, userIdService, textService) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.http = http;
        this.userIdService = userIdService;
        this.textService = textService;
        this.wihslists = '';
        this.items = [];
        this.text = '';
        this.conditions = ['New', 'Almost New', 'Slighlty Damaged', 'Worn'];
        this.minPrice = 0;
        this.maxPrice = 10000000;
        this.condition = '';
        this.showPriceFilter = false;
        this.showConditionFilter = false;
        this.authToken = this.userIdService.getToken();
        this.textService.searchText.subscribe(function (data) {
            _this.text = data;
        });
    }
    MyListingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]()
            .set('Authorization', this.authToken)
            .set('Content-Type', 'application/json');
        var userId = this.userIdService.getUserId();
        this.http.get('http://localhost:2000/mylistings/' + userId, { headers: headers }).subscribe(function (data) {
            _this.items = data;
        });
    };
    MyListingsComponent.prototype.showDetail = function ($event) {
        var id = parseInt($event.target.id);
        this.router.navigate((['listings/' + id]));
    };
    MyListingsComponent.prototype.removeFromListings = function ($event) {
        var _this = this;
        var bookId = parseInt($event.target.id);
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]()
            .set('Authorization', this.authToken)
            .set('Content-Type', 'application/json');
        this.http.post('http://localhost:2000/removefromlistings', { id: bookId }, {
            headers: headers
        }).subscribe(function (data) {
            // console.log(data);
            _this.items = [];
            _this.ngOnInit();
        });
    };
    MyListingsComponent.prototype.filter = function (items) {
        var _this = this;
        var arr = [];
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            if (item != undefined) {
                if (item.bookName.toLowerCase().includes(this.text.toLowerCase()) || item.authorName.toLowerCase().includes(this.text.toLowerCase())) {
                    if (parseInt(item.price) >= this.minPrice && parseInt(item.price) <= this.maxPrice)
                        if (this.showConditionFilter) {
                            if (item.condition == this.condition || this.condition == '') {
                                arr.push(item);
                            }
                        }
                        else
                            arr.push(item);
                }
            }
        }
        if (this.sortPrice) {
            arr.sort(function (a, b) { return (a.price - b.price); });
        }
        if (this.sortCondition) {
            arr.sort(function (a, b) { return (_this.conditions.indexOf(a.condition) - _this.conditions.indexOf(b.condition)); });
        }
        if (this.sortCondition && this.sortPrice) {
            arr.sort(function (a, b) {
                if (a.price != b.price) {
                    return a.price - b.price;
                }
                return _this.conditions.indexOf(a.condition) - _this.conditions.indexOf(b.condition);
            });
        }
        return arr;
    };
    MyListingsComponent.prototype.setPriceFilter = function (filter) {
        this.showPriceFilter = filter;
    };
    MyListingsComponent.prototype.setConditionFilter = function (filter) {
        this.showConditionFilter = filter;
    };
    MyListingsComponent.prototype.selectedCondition = function (condition) {
        this.condition = condition;
    };
    MyListingsComponent.prototype.setSortPrice = function (sortPrice) {
        this.sortPrice = sortPrice;
    };
    MyListingsComponent.prototype.setSortCondition = function (sortCondition) {
        this.sortCondition = sortCondition;
    };
    MyListingsComponent.prototype.reset = function () {
        this.showConditionFilter = false;
        this.showPriceFilter = false;
        this.condition = '';
        this.minPrice = 0;
        this.maxPrice = 1000000;
        this.priceBoxValue = false;
        this.conditionBoxValue = false;
        this.sortPrice = false;
        this.sortCondition = false;
    };
    MyListingsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-my-listings',
            template: __webpack_require__(/*! ./my-listings.component.html */ "./src/app/my-listings/my-listings.component.html"),
            styles: [__webpack_require__(/*! ./my-listings.component.css */ "./src/app/my-listings/my-listings.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            _services_user_id_service__WEBPACK_IMPORTED_MODULE_3__["UserIdService"],
            _services_inp_text_service__WEBPACK_IMPORTED_MODULE_4__["InpTextService"]])
    ], MyListingsComponent);
    return MyListingsComponent;
}());



/***/ }),

/***/ "./src/app/new-listing/new-listing.component.css":
/*!*******************************************************!*\
  !*** ./src/app/new-listing/new-listing.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n@import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');\n\nhtml,body{\n  position: relative;\n  height: 100%;\n}\n\n.login-container{\n  position: relative;\n  width: 380px;\n  margin: 80px auto;\n  padding: 20px 40px 40px;\n  text-align: center;\n  background: #fff;\n  border: 1px solid #ccc;\n}\n\n#output{\n  position: absolute;\n  width: 300px;\n  top: -75px;\n  left: 0;\n  color: #fff;\n}\n\n#output.alert-success{\n  background: rgb(25, 204, 25);\n}\n\n#output.alert-danger{\n  background: rgb(228, 105, 105);\n}\n\n.login-container::before,.login-container::after{\n  content: \"\";\n  position: absolute;\n  width: 100%;height: 100%;\n  top: 3.5px;left: 0;\n  background: #fff;\n  z-index: -1;\n  -webkit-transform: rotateZ(4deg);\n  -moz-transform: rotateZ(4deg);\n  -ms-transform: rotateZ(4deg);\n  border: 1px solid #ccc;\n\n}\n\n.login-container::after{\n  top: 5px;\n  z-index: -2;\n  -webkit-transform: rotateZ(-2deg);\n  -moz-transform: rotateZ(-2deg);\n  -ms-transform: rotateZ(-2deg);\n\n}\n\n.avatar{\n  width: 140px;height: 140px;\n  margin: 10px auto 30px;\n  background-size: cover;\n}\n\n.form-box input{\n  width: 100%;\n  padding: 10px;\n  text-align: center;\n  height:40px;\n  border: 1px solid #ccc;;\n  background: #fafafa;\n  transition:0.2s ease-in-out;\n  margin-bottom: 8px;\n\n}\n\n.form-box input:focus{\n  outline: 0;\n  background: #eee;\n}\n\n.form-box input[type=\"text\"]{\n  border-radius: 5px 5px 0 0;\n}\n\n.form-box input[type=\"password\"]{\n  border-radius: 0 0 5px 5px;\n  border-top: 0;\n}\n\n.form-box button.login{\n  margin-top:15px;\n  padding: 10px 20px;\n}\n\n.animated {\n  -webkit-animation-duration: 1s;\n  animation-duration: 1s;\n  -webkit-animation-fill-mode: both;\n  animation-fill-mode: both;\n}\n\n@-webkit-keyframes fadeInUp {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n    transform: translateY(20px);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n    transform: translateY(0);\n  }\n}\n\n@keyframes fadeInUp {\n  0% {\n    opacity: 0;\n    -webkit-transform: translateY(20px);\n    transform: translateY(20px);\n  }\n\n  100% {\n    opacity: 1;\n    -webkit-transform: translateY(0);\n    transform: translateY(0);\n  }\n}\n\n.fadeInUp {\n  -webkit-animation-name: fadeInUp;\n  animation-name: fadeInUp;\n}\n\n.file-upload{display:block;text-align:center;font-family: Helvetica, Arial, sans-serif;font-size: 12px;}\n\n.file-upload .file-select{display:block;border: 2px solid #dce4ec;color: #34495e;cursor:pointer;height:40px;line-height:40px;text-align:left;background:#FFFFFF;overflow:hidden;position:relative;}\n\n.file-upload .file-select .file-select-button{background:#dce4ec;padding:0 10px;display:inline-block;height:40px;line-height:40px;}\n\n.file-upload .file-select .file-select-name{line-height:40px;display:inline-block;padding:0 10px;}\n\n.file-upload .file-select:hover{border-color:#34495e;transition:all .2s ease-in-out;-moz-transition:all .2s ease-in-out;-webkit-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;}\n\n.file-upload .file-select:hover .file-select-button{background:#34495e;color:#FFFFFF;transition:all .2s ease-in-out;-moz-transition:all .2s ease-in-out;-webkit-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;}\n\n.file-upload.active .file-select{border-color:#3fa46a;transition:all .2s ease-in-out;-moz-transition:all .2s ease-in-out;-webkit-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;}\n\n.file-upload.active .file-select .file-select-button{background:#3fa46a;color:#FFFFFF;transition:all .2s ease-in-out;-moz-transition:all .2s ease-in-out;-webkit-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;}\n\n.file-upload .file-select input[type=file]{z-index:100;cursor:pointer;position:absolute;height:100%;width:100%;top:0;left:0;opacity:0;filter:alpha(opacity=0);}\n\n.file-upload .file-select.file-select-disabled{opacity:0.65;}\n\n.file-upload .file-select.file-select-disabled:hover{cursor:default;display:block;border: 2px solid #dce4ec;color: #34495e;cursor:pointer;height:40px;line-height:40px;margin-top:5px;text-align:left;background:#FFFFFF;overflow:hidden;position:relative;}\n\n.file-upload .file-select.file-select-disabled:hover .file-select-button{background:#dce4ec;color:#666666;padding:0 10px;display:inline-block;height:40px;line-height:40px;}\n\n.file-upload .file-select.file-select-disabled:hover .file-select-name{line-height:40px;display:inline-block;padding:0 10px;}\n"

/***/ }),

/***/ "./src/app/new-listing/new-listing.component.html":
/*!********************************************************!*\
  !*** ./src/app/new-listing/new-listing.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"login-container\">\n    <div id=\"output\"></div>\n    <img class=\"avatar\" src=\"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUeR3inb2aWsUD3dj1sFSRvoQZqU3VyjWuqyO6KTVW9rEz82QO\">\n    <div class=\"form-box\">\n      <form action=\"\" method=\"\">\n        <input [(ngModel)]=\"bookName\" name=\"bookName\" type=\"text\" placeholder=\"Book Name\">\n        <input [(ngModel)]=\"author\" name=\"author\" type=\"text\" placeholder=\"Author\">\n        <input [(ngModel)]=\"price\" name=\"price\" type=\"text\" placeholder=\"Price\">\n        <div class=\"form-inline\">\n          <label for=\"conditions\" class=\"col-sm-4 control-label\">Condition: </label>\n          <div class=\"col-sm-7\">\n            <select id=\"conditions\" class=\"form-control\" [(ngModel)]=\"selectedCond\" name=\"conditions\" (ngModelChange)=\"selectedCondition($event)\"  >\n              <option *ngFor=\"let c of conditions\" [ngValue]=\"c\" selected> {{c}} </option>\n            </select>\n          </div>\n        </div>\n        <div class=\"file-upload\" style=\"margin-top: 1rem;\">\n          <div class=\"file-select\">\n            <div class=\"file-select-button\" id=\"fileName\">Choose Book Image</div>\n            <div class=\"file-select-name\" id=\"noFile\">{{ chosenFileName }}</div>\n            <input type=\"file\" id=\"chooseFile\" name=\"avatar\" accept=\"image/png, image/jpg, image/jpeg\" (change)=\"handleFileInput($event.target.files)\">\n          </div>\n        </div>\n        <button class=\"btn btn-info btn-block login\" type=\"submit\" (click)=\"submit()\">Add Book!</button>\n      </form>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/new-listing/new-listing.component.ts":
/*!******************************************************!*\
  !*** ./src/app/new-listing/new-listing.component.ts ***!
  \******************************************************/
/*! exports provided: NewListingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewListingComponent", function() { return NewListingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _services_user_id_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_services/user-id.service */ "./src/app/_services/user-id.service.ts");
/* harmony import */ var _services_file_upload_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_services/file-upload.service */ "./src/app/_services/file-upload.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NewListingComponent = /** @class */ (function () {
    function NewListingComponent(http, userIdService, fileUploadService) {
        this.http = http;
        this.userIdService = userIdService;
        this.fileUploadService = fileUploadService;
        this.bookName = '';
        this.author = '';
        this.price = '';
        this.condition = 'New';
        this.imgUrl = '';
        this.fileToUpload = null;
        this.obj = {};
        this.valid = true;
        this.conditions = ['New', 'Almost New', 'Slighlty Damaged', 'Worn'];
        this.chosenFileName = 'No File Chosen...';
        this.authToken = this.userIdService.getToken();
    }
    NewListingComponent.prototype.ngOnInit = function () {
    };
    NewListingComponent.prototype.submit = function () {
        var _this = this;
        this.valid = true;
        var sellerID = this.userIdService.getUserId();
        this.obj = {
            seller: sellerID,
            bookName: this.bookName,
            authorName: this.author,
            price: this.price,
            condition: this.condition,
            imgUrl: this.imgUrl
        };
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]()
            .set('Authorization', this.authToken)
            .set('Content-Type', 'application/json');
        if (this.bookName.length == 0) {
            alert("Book Name Can't be Empty!");
            this.valid = false;
        }
        else if (this.author.length == 0) {
            alert("Author Name Can't be Empty!");
            this.valid = false;
        }
        else if (this.price.length == 0) {
            alert("Price Field Can't be Empty!");
            this.valid = false;
        }
        else if (isNaN(parseInt(this.price))) {
            alert("Price must be a number");
            this.valid = false;
        }
        else if (parseInt(this.price) < 0) {
            alert("Price Can't be less than 0!");
            this.valid = false;
        }
        if (this.valid) {
            this.http.post('http://localhost:2000/listings/add', this.obj, {
                headers: headers
            }).subscribe(function (data) {
                // console.log(data);
                _this.fileUploadService.addProduct(_this.image, data['id']);
                alert('Listing added Successfully!');
                _this.bookName = '';
                _this.author = '';
                _this.price = '';
                _this.imgUrl = '';
            });
        }
    };
    NewListingComponent.prototype.selectedCondition = function (condition) {
        this.condition = condition;
    };
    NewListingComponent.prototype.handleFileInput = function (files) {
        this.image = files.item(0);
        this.chosenFileName = files.item(0)['name'];
    };
    NewListingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-new-listing',
            template: __webpack_require__(/*! ./new-listing.component.html */ "./src/app/new-listing/new-listing.component.html"),
            styles: [__webpack_require__(/*! ./new-listing.component.css */ "./src/app/new-listing/new-listing.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _services_user_id_service__WEBPACK_IMPORTED_MODULE_2__["UserIdService"], _services_file_upload_service__WEBPACK_IMPORTED_MODULE_3__["FileUploadService"]])
    ], NewListingComponent);
    return NewListingComponent;
}());



/***/ }),

/***/ "./src/app/new-message/new-message.component.css":
/*!*******************************************************!*\
  !*** ./src/app/new-message/new-message.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/new-message/new-message.component.html":
/*!********************************************************!*\
  !*** ./src/app/new-message/new-message.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  new-message works!\n</p>\n"

/***/ }),

/***/ "./src/app/new-message/new-message.component.ts":
/*!******************************************************!*\
  !*** ./src/app/new-message/new-message.component.ts ***!
  \******************************************************/
/*! exports provided: NewMessageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewMessageComponent", function() { return NewMessageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _services_user_id_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_services/user-id.service */ "./src/app/_services/user-id.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NewMessageComponent = /** @class */ (function () {
    function NewMessageComponent(route, router, http, userIdService) {
        this.route = route;
        this.router = router;
        this.http = http;
        this.userIdService = userIdService;
        this.allIds = [];
        this.headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]()
            .set('Authorization', 'my-auth-token')
            .set('Content-Type', 'application/json');
    }
    NewMessageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userId = this.userIdService.getUserId();
        this.http.get('http://localhost:2000/message/' + this.userId, { headers: this.headers }).subscribe(function (data) {
            _this.messages = data;
            for (var _i = 0, _a = _this.messages; _i < _a.length; _i++) {
                var message = _a[_i];
                _this.allIds.push(message.from);
            }
            _this.unique = _this.allIds.filter(function (v, i, a) { return a.indexOf(v) === i; });
        });
        this.http.get('http://localhost:2000/message/sent/' + this.userId, { headers: this.headers }).subscribe(function (data) {
            _this.messages = data;
            for (var _i = 0, _a = _this.messages; _i < _a.length; _i++) {
                var message = _a[_i];
                _this.allIds.push(message.to);
            }
            _this.unique = _this.allIds.filter(function (v, i, a) { return a.indexOf(v) === i; });
            console.log(_this.unique);
        });
    };
    NewMessageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-new-message',
            template: __webpack_require__(/*! ./new-message.component.html */ "./src/app/new-message/new-message.component.html"),
            styles: [__webpack_require__(/*! ./new-message.component.css */ "./src/app/new-message/new-message.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"],
            _services_user_id_service__WEBPACK_IMPORTED_MODULE_3__["UserIdService"]])
    ], NewMessageComponent);
    return NewMessageComponent;
}());



/***/ }),

/***/ "./src/app/test-component/test-component.component.css":
/*!*************************************************************!*\
  !*** ./src/app/test-component/test-component.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "body{\n  margin:0;\n  color:#6a6f8c;\n  background:#c8c8c8;\n  font:600 16px/18px 'Open Sans',sans-serif;\n}\n*,:after,:before{box-sizing:border-box}\n.clearfix:after,.clearfix:before{content:'';display:table}\n.clearfix:after{clear:both;display:block}\na{color:inherit;text-decoration:none}\n.login-wrap{\n  width:100%;\n  margin:auto;\n  max-width:525px;\n  min-height:670px;\n  position:relative;\n  background:url(https://raw.githubusercontent.com/khadkamhn/day-01-login-form/master/img/bg.jpg) no-repeat center;\n  box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19);\n}\n.login-html{\n  width:100%;\n  height:100%;\n  position:absolute;\n  padding:90px 70px 50px 70px;\n  background:rgba(40,57,101,.9);\n}\n.login-html .sign-in-htm,\n.login-html .sign-up-htm{\n  top:0;\n  left:0;\n  right:0;\n  bottom:0;\n  position:absolute;\n  -webkit-transform:rotateY(180deg);\n          transform:rotateY(180deg);\n  -webkit-backface-visibility:hidden;\n          backface-visibility:hidden;\n  transition:all .4s linear;\n}\n.login-html .sign-in,\n.login-html .sign-up,\n.login-form .group .check{\n  display:none;\n}\n.login-html .tab,\n.login-form .group .label,\n.login-form .group .button{\n  text-transform:uppercase;\n}\n.login-html .tab{\n  font-size:22px;\n  margin-right:15px;\n  padding-bottom:5px;\n  margin:0 15px 10px 0;\n  display:inline-block;\n  border-bottom:2px solid transparent;\n}\n.login-html .sign-in:checked + .tab,\n.login-html .sign-up:checked + .tab{\n  color:#fff;\n  border-color:#1161ee;\n}\n.login-form{\n  min-height:345px;\n  position:relative;\n  -webkit-perspective:1000px;\n          perspective:1000px;\n  -webkit-transform-style:preserve-3d;\n          transform-style:preserve-3d;\n}\n.login-form .group{\n  margin-bottom:15px;\n}\n.login-form .group .label,\n.login-form .group .input,\n.login-form .group .button{\n  width:100%;\n  color:#fff;\n  display:block;\n}\n.login-form .group .input,\n.login-form .group .button{\n  border:none;\n  padding:15px 20px;\n  border-radius:25px;\n  background:rgba(255,255,255,.1);\n}\n.login-form .group input[data-type=\"password\"]{\n  text-security:circle;\n  -webkit-text-security:circle;\n}\n.login-form .group .label{\n  color:#aaa;\n  font-size:12px;\n}\n.login-form .group .button{\n  background:#1161ee;\n}\n.login-form .group label .icon{\n  width:15px;\n  height:15px;\n  border-radius:2px;\n  position:relative;\n  display:inline-block;\n  background:rgba(255,255,255,.1);\n}\n.login-form .group label .icon:before,\n.login-form .group label .icon:after{\n  content:'';\n  width:10px;\n  height:2px;\n  background:#fff;\n  position:absolute;\n  transition:all .2s ease-in-out 0s;\n}\n.login-form .group label .icon:before{\n  left:3px;\n  width:5px;\n  bottom:6px;\n  -webkit-transform:scale(0) rotate(0);\n          transform:scale(0) rotate(0);\n}\n.login-form .group label .icon:after{\n  top:6px;\n  right:0;\n  -webkit-transform:scale(0) rotate(0);\n          transform:scale(0) rotate(0);\n}\n.login-form .group .check:checked + label{\n  color:#fff;\n}\n.login-form .group .check:checked + label .icon{\n  background:#1161ee;\n}\n.login-form .group .check:checked + label .icon:before{\n  -webkit-transform:scale(1) rotate(45deg);\n          transform:scale(1) rotate(45deg);\n}\n.login-form .group .check:checked + label .icon:after{\n  -webkit-transform:scale(1) rotate(-45deg);\n          transform:scale(1) rotate(-45deg);\n}\n.login-html .sign-in:checked + .tab + .sign-up + .tab + .login-form .sign-in-htm{\n  -webkit-transform:rotate(0);\n          transform:rotate(0);\n}\n.login-html .sign-up:checked + .tab + .login-form .sign-up-htm{\n  -webkit-transform:rotate(0);\n          transform:rotate(0);\n}\n#submitbtn {\n  margin-bottom: 0px;\n}\n.hr{\n  height:2px;\n  margin:60px 0 50px 0;\n  background:rgba(255,255,255,.2);\n}\n.foot-lnk{\n  text-align:center;\n}\n"

/***/ }),

/***/ "./src/app/test-component/test-component.component.html":
/*!**************************************************************!*\
  !*** ./src/app/test-component/test-component.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"login-wrap\">\n  <div class=\"login-html\">\n    <input id=\"tab-1\" type=\"radio\" name=\"tab\" class=\"sign-in\" checked><label for=\"tab-1\" class=\"tab\">Sign In</label>\n    <input id=\"tab-2\" type=\"radio\" name=\"tab\" class=\"sign-up\"><label for=\"tab-2\" class=\"tab\">Sign Up</label>\n    <div class=\"login-form\">\n      <div class=\"sign-in-htm\">\n        <span *ngIf=\"invalid\" style=\"color: white\">Invalid Credentials!</span>\n        <div class=\"group\">\n          <label for=\"user\" class=\"label\">Username</label>\n          <input id=\"user\" type=\"text\" class=\"input\" [(ngModel)]=\"loginemail\">\n        </div>\n        <div class=\"group\">\n          <label for=\"pass\" class=\"label\">Password</label>\n          <input id=\"pass\" type=\"password\" class=\"input\" data-type=\"password\" [(ngModel)]=\"loginpass\">\n        </div>\n        <div class=\"group\">\n          <input id=\"check\" type=\"checkbox\" class=\"check\" checked>\n          <label for=\"check\"><span class=\"icon\"></span> Keep me Signed in</label>\n        </div>\n        <div class=\"group\">\n          <input type=\"submit\" (click)=\"login()\" class=\"button\" value=\"Sign In\">\n        </div>\n        <div class=\"hr\"></div>\n      </div>\n\n\n      <div class=\"sign-up-htm\">\n        <div class=\"group\">\n          <label for=\"name\" class=\"label\">Name</label>\n          <input id=\"name\" type=\"text\" class=\"input\" [(ngModel)]=\"name\">\n        </div>\n        <div class=\"group\">\n          <label for=\"email\" class=\"label\">Email</label>\n          <input id=\"email\" type=\"text\" class=\"input\" [(ngModel)]=\"email\">\n        </div>\n        <div class=\"group\">\n          <label for=\"password\" class=\"label\">Password</label>\n          <input id=\"password\" type=\"text\" class=\"input\" [(ngModel)]=\"password\">\n        </div>\n        <div class=\"group\">\n          <label for=\"college\" class=\"label\">College</label>\n          <input id=\"college\" type=\"text\" class=\"input\" [(ngModel)]=\"college\">\n        </div>\n        <div class=\"group\">\n          <label for=\"phone\" class=\"label\">Phone</label>\n          <input id=\"phone\" type=\"text\" class=\"input\" [(ngModel)]=\"phone\">\n        </div>\n        <div class=\"group\" id=\"submitbtn\">\n          <input type=\"submit\" (click)=\"signup()\" class=\"button\" value=\"Sign Up\">\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/test-component/test-component.component.ts":
/*!************************************************************!*\
  !*** ./src/app/test-component/test-component.component.ts ***!
  \************************************************************/
/*! exports provided: TestComponentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestComponentComponent", function() { return TestComponentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TestComponentComponent = /** @class */ (function () {
    function TestComponentComponent(formBuilder, route, router, http) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.http = http;
        this.loginemail = '';
        this.loginpass = '';
        this.name = '';
        this.email = '';
        this.password = '';
        this.college = '';
        this.phone = '';
        this.address = 'ggsipu';
        this.invalid = false;
    }
    TestComponentComponent.prototype.ngOnInit = function () {
    };
    TestComponentComponent.prototype.login = function () {
        var _this = this;
        var obj = { email: this.loginemail, password: this.loginpass };
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]()
            .set('Authorization', 'my-auth-token')
            .set('Content-Type', 'application/json');
        this.http.post('http://localhost:2000/login', obj, {
            headers: headers
        }).subscribe(function (data) {
            if (data) {
                window.localStorage.setItem('token', _this.email);
                window.localStorage.setItem('userId', data['id']);
                _this.router.navigate(['listings']);
                _this.invalid = false;
            }
            else {
                _this.invalid = true;
            }
        });
    };
    TestComponentComponent.prototype.signup = function () {
        var _this = this;
        var obj = { name: this.name, password: this.password, email: this.email, college: this.college, address: this.address, phone: this.phone };
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]()
            .set('Authorization', 'my-auth-token')
            .set('Content-Type', 'application/json');
        // console.log(obj);
        this.http.post('http://localhost:2000/signup', obj, {
            headers: headers
        }).subscribe(function (data) {
            if (data) {
                _this.router.navigate(['listings']);
            }
            else {
                console.log(data);
            }
        });
    };
    TestComponentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-test-component',
            template: __webpack_require__(/*! ./test-component.component.html */ "./src/app/test-component/test-component.component.html"),
            styles: [__webpack_require__(/*! ./test-component.component.css */ "./src/app/test-component/test-component.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], TestComponentComponent);
    return TestComponentComponent;
}());



/***/ }),

/***/ "./src/app/wishlist/wishlist.component.css":
/*!*************************************************!*\
  !*** ./src/app/wishlist/wishlist.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n@import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');\n\n.btn-primary:hover,\n.btn-primary:focus {\n  background-color: #108d6f;\n  border-color: #108d6f;\n  box-shadow: none;\n  outline: none;\n}\n\n.btn-primary {\n  color: #fff;\n  background-color: #007b5e;\n  border-color: #007b5e;\n}\n\nsection {\n  padding: 60px 0;\n}\n\nsection .section-title {\n  text-align: center;\n  color: #007b5e;\n  margin-bottom: 50px;\n  text-transform: uppercase;\n}\n\n#team .card {\n  border: none;\n  background: #ffffff;\n}\n\n.image-flip:hover .backside,\n.image-flip.hover .backside {\n  -webkit-transform: rotateY(0deg);\n  transform: rotateY(0deg);\n  border-radius: .25rem;\n}\n\n.image-flip:hover .frontside,\n.image-flip.hover .frontside {\n  -webkit-transform: rotateY(180deg);\n  transform: rotateY(180deg);\n}\n\n.mainflip {\n  -webkit-transition: 1s;\n  -webkit-transform-style: preserve-3d;\n  -ms-transition: 1s;\n  -moz-transition: 1s;\n  -moz-transform: perspective(1000px);\n  -moz-transform-style: preserve-3d;\n  -ms-transform-style: preserve-3d;\n  transition: 1s;\n  transform-style: preserve-3d;\n  position: relative;\n}\n\n.frontside {\n  position: relative;\n  -webkit-transform: rotateY(0deg);\n  -ms-transform: rotateY(0deg);\n  z-index: 2;\n  margin-bottom: 30px;\n}\n\n.backside {\n  position: absolute;\n  top: 0;\n  left: 0;\n  background: white;\n  -webkit-transform: rotateY(-180deg);\n  transform: rotateY(-180deg);\n  box-shadow: 5px 7px 9px -4px rgb(158, 158, 158);\n}\n\n.frontside,\n.backside {\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  -webkit-transition: 1s;\n  -webkit-transform-style: preserve-3d;\n  -moz-transition: 1s;\n  -moz-transform-style: preserve-3d;\n  -o-transition: 1s;\n  -o-transform-style: preserve-3d;\n  -ms-transition: 1s;\n  -ms-transform-style: preserve-3d;\n  transition: 1s;\n  transform-style: preserve-3d;\n}\n\n.frontside .card,\n.backside .card {\n  min-height: 312px;\n  min-width: 350px;\n}\n\n.backside .card a {\n  font-size: 18px;\n  color: #007b5e !important;\n}\n\n.frontside .card .card-title,\n.backside .card .card-title {\n  color: #00ccff !important;\n}\n\n.frontside .card .card-body img {\n  width: 120px;\n  height: 120px;\n  border-radius: 50%;\n}\n\nimg {\n  border-radius: 5% !important;\n}\n\n.fa-plus {\n  color: white;\n}\n"

/***/ }),

/***/ "./src/app/wishlist/wishlist.component.html":
/*!**************************************************!*\
  !*** ./src/app/wishlist/wishlist.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section id=\"team\" class=\"pb-5\">\n  <div class=\"container\">\n    <div style=\"margin-bottom: 2rem;\">\n      <span>Filters: </span>\n      <div class=\"form-check-inline row\">\n        <div class=\"form-check col-sm-6\">\n          <label class=\"form-check-label\" for=\"price\">\n            <input [(ngModel)]=\"priceBoxValue\" (change)=\"setPriceFilter(priceBoxValue)\" type=\"checkbox\" class=\"form-check-input\" name=\"price\" id=\"price\"> Price\n          </label>\n        </div>\n        <div class=\"form-check col-sm-6\">\n          <label class=\"form-check-label\" for=\"condition\">\n            <input [(ngModel)]=\"conditionBoxValue\" (change)=\"setConditionFilter(conditionBoxValue)\" type=\"checkbox\" class=\"form-check-input\" name=\"condition\" id=\"condition\"> Condition\n          </label>\n        </div>\n        <div class=\"form-check col-sm-6\">\n          <label class=\"form-check-label\" for=\"sortPrice\">\n            <input [(ngModel)]=\"sortPrice\" (change)=\"setSortPrice(sortPrice)\" type=\"checkbox\" class=\"form-check-input\" name=\"sortPrice\" id=\"sortPrice\"> Sort By Price\n          </label>\n        </div>\n        <div class=\"form-check col-sm-6\">\n          <label class=\"form-check-label\" for=\"sortCondition\">\n            <input [(ngModel)]=\"sortCondition\" (change)=\"setSortCondition(sortCondition)\" type=\"checkbox\" class=\"form-check-input\" name=\"sortCondition\" id=\"sortCondition\"> Sort By Condition\n          </label>\n        </div>\n      </div>\n      <span *ngIf=\"showPriceFilter\" style=\"margin-right: 1rem\">\n        <label class=\"form-check-label\" for=\"min\" style=\"margin-left: 1rem;margin-right: 0.5rem;\">Min</label>\n        <input [(ngModel)] = 'minPrice' style=\"width: 5em;\" id=\"min\">\n        <label class=\"form-check-label\" for=\"min\" style=\"margin-left: 1rem;margin-right: 0.5rem;\">Max</label>\n        <input [(ngModel)] = 'maxPrice' style=\"width: 5em;\" id=\"max\">\n      </span>\n      <select class=\"selectpicker\" [(ngModel)]=\"selectedCond\" *ngIf=\"showConditionFilter\" (ngModelChange)=\"selectedCondition($event)\" style=\"margin-left: 1rem;margin-right: 1rem;\"  >\n        <option *ngFor=\"let c of conditions\" [ngValue]=\"c\"> {{c}} </option>\n      </select>\n      <button (click)=\"reset()\" class=\"btn btn-outline-primary\">Reset</button>\n    </div>\n\n    <div class=\"row\">\n      <div class=\"col-xs-12 col-sm-6 col-md-4\" *ngFor=\"let item of filter(items)\">\n        <div class=\"image-flip\" ontouchstart=\"this.classList.toggle('hover');\">\n          <div class=\"mainflip\">\n            <div class=\"frontside\">\n              <div class=\"card\">\n                <div class=\"card-body text-center\">\n                  <p><img class=\"img-fluid\" src=\"{{ item.imgUrl }}\" alt=\"card image\"></p>\n                  <h4 class=\"card-title\"><strong>{{ item.bookName }}</strong></h4>\n                  <p class=\"card-text\"><strong>Price</strong> - Rs.{{ item.price }}</p>\n                  <p class=\"card-text\"><strong>Author</strong> - {{ item.authorName}}</p>\n                  </div>\n              </div>\n            </div>\n            <div class=\"backside\">\n              <div class=\"card\">\n                <div class=\"card-body text-center mt-4\">\n                  <h4 class=\"card-title\">{{ item.bookName }}</h4>\n                  <p class=\"card-text\" align=\"left\" style=\"margin-left: 4rem; margin-top: 2rem;\">\n                    <span><strong>Author:</strong> {{ item.authorName }} </span><br>\n                    <span><strong>Price:</strong> {{ item.price}}</span><br>\n                    <span><strong>Condition:</strong> {{ item.condition }}</span><br>\n                  </p>\n                  <ul class=\"list-inline\" style=\"margin-top: 4rem;\">\n                    <li class=\"list-inline-item\">\n                      <button class=\"btn btn-info\" id=\"{{ item.id }}\" (click)=\"showDetail($event)\">View Details</button>\n                    </li>\n                    <li class=\"list-inline-item\">\n                      <button class=\"btn btn-danger\" id=\"{{ item.id }}\" (click)=\"removeFromWishlist($event)\">Remove from Wishlist</button>\n                    </li>\n                  </ul>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</section>\n"

/***/ }),

/***/ "./src/app/wishlist/wishlist.component.ts":
/*!************************************************!*\
  !*** ./src/app/wishlist/wishlist.component.ts ***!
  \************************************************/
/*! exports provided: WishlistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WishlistComponent", function() { return WishlistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_user_id_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_services/user-id.service */ "./src/app/_services/user-id.service.ts");
/* harmony import */ var _services_inp_text_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_services/inp-text.service */ "./src/app/_services/inp-text.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var WishlistComponent = /** @class */ (function () {
    function WishlistComponent(route, router, http, userIdService, textSerice) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.http = http;
        this.userIdService = userIdService;
        this.textSerice = textSerice;
        this.wihslists = '';
        this.items = [];
        this.text = '';
        this.conditions = ['New', 'Almost New', 'Slighlty Damaged', 'Worn'];
        this.minPrice = 0;
        this.maxPrice = 10000000;
        this.condition = '';
        this.showPriceFilter = false;
        this.showConditionFilter = false;
        this.authToken = this.userIdService.getToken();
        this.textSerice.searchText.subscribe(function (data) {
            _this.text = data;
        });
    }
    WishlistComponent.prototype.ngOnInit = function () {
        var _this = this;
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]()
            .set('Authorization', this.authToken)
            .set('Content-Type', 'application/json');
        var userId = this.userIdService.getUserId();
        this.http.get('http://localhost:2000/wishlist/' + userId, { headers: headers }).subscribe(function (data) {
            _this.wihslists = data;
            for (var _i = 0, _a = _this.wihslists; _i < _a.length; _i++) {
                var wishlist = _a[_i];
                var bookid = wishlist.bookid;
                _this.http.get('http://localhost:2000/listings/' + bookid, { headers: headers }).subscribe(function (data) {
                    _this.items.push(data);
                });
            }
        });
    };
    WishlistComponent.prototype.showDetail = function ($event) {
        var id = parseInt($event.target.id);
        this.router.navigate((['listings/' + id]));
    };
    WishlistComponent.prototype.removeFromWishlist = function ($event) {
        var _this = this;
        var bookId = parseInt($event.target.id);
        var userId = this.userIdService.getUserId();
        var obj = { bookid: bookId, userid: userId };
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]()
            .set('Authorization', this.authToken)
            .set('Content-Type', 'application/json');
        this.http.post('http://localhost:2000/removefromwishlist', obj, {
            headers: headers
        }).subscribe(function (data) {
            console.log(data);
            _this.items = [];
            _this.ngOnInit();
        });
    };
    WishlistComponent.prototype.filter = function (items) {
        var _this = this;
        var arr = [];
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            if (item != undefined) {
                if (item.bookName.toLowerCase().includes(this.text.toLowerCase()) || item.authorName.toLowerCase().includes(this.text.toLowerCase())) {
                    if (parseInt(item.price) >= this.minPrice && parseInt(item.price) <= this.maxPrice)
                        if (this.showConditionFilter) {
                            if (item.condition == this.condition || this.condition == '') {
                                arr.push(item);
                            }
                        }
                        else
                            arr.push(item);
                }
            }
        }
        if (this.sortPrice) {
            arr.sort(function (a, b) { return (a.price - b.price); });
        }
        if (this.sortCondition) {
            arr.sort(function (a, b) { return (_this.conditions.indexOf(a.condition) - _this.conditions.indexOf(b.condition)); });
        }
        if (this.sortCondition && this.sortPrice) {
            arr.sort(function (a, b) {
                if (a.price != b.price) {
                    return a.price - b.price;
                }
                return _this.conditions.indexOf(a.condition) - _this.conditions.indexOf(b.condition);
            });
        }
        return arr;
    };
    WishlistComponent.prototype.setPriceFilter = function (filter) {
        this.showPriceFilter = filter;
    };
    WishlistComponent.prototype.setConditionFilter = function (filter) {
        this.showConditionFilter = filter;
    };
    WishlistComponent.prototype.selectedCondition = function (condition) {
        this.condition = condition;
    };
    WishlistComponent.prototype.setSortPrice = function (sortPrice) {
        this.sortPrice = sortPrice;
    };
    WishlistComponent.prototype.setSortCondition = function (sortCondition) {
        this.sortCondition = sortCondition;
    };
    WishlistComponent.prototype.reset = function () {
        this.showConditionFilter = false;
        this.showPriceFilter = false;
        this.condition = '';
        this.minPrice = 0;
        this.maxPrice = 1000000;
        this.priceBoxValue = false;
        this.conditionBoxValue = false;
        this.sortPrice = false;
        this.sortCondition = false;
    };
    WishlistComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-wishlist',
            template: __webpack_require__(/*! ./wishlist.component.html */ "./src/app/wishlist/wishlist.component.html"),
            styles: [__webpack_require__(/*! ./wishlist.component.css */ "./src/app/wishlist/wishlist.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"],
            _services_user_id_service__WEBPACK_IMPORTED_MODULE_3__["UserIdService"],
            _services_inp_text_service__WEBPACK_IMPORTED_MODULE_4__["InpTextService"]])
    ], WishlistComponent);
    return WishlistComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/thesparkboy/Desktop/bookabook/frontend/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map