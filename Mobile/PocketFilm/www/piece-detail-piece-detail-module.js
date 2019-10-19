(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["piece-detail-piece-detail-module"],{

/***/ "./src/app/piece-detail/piece-detail.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/piece-detail/piece-detail.module.ts ***!
  \*****************************************************/
/*! exports provided: PieceDetailPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PieceDetailPageModule", function() { return PieceDetailPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _piece_detail_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./piece-detail.page */ "./src/app/piece-detail/piece-detail.page.ts");







var routes = [
    {
        path: '',
        component: _piece_detail_page__WEBPACK_IMPORTED_MODULE_6__["PieceDetailPage"]
    }
];
var PieceDetailPageModule = /** @class */ (function () {
    function PieceDetailPageModule() {
    }
    PieceDetailPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_piece_detail_page__WEBPACK_IMPORTED_MODULE_6__["PieceDetailPage"]]
        })
    ], PieceDetailPageModule);
    return PieceDetailPageModule;
}());



/***/ }),

/***/ "./src/app/piece-detail/piece-detail.page.html":
/*!*****************************************************!*\
  !*** ./src/app/piece-detail/piece-detail.page.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"danger\">\n      <ion-buttons slot=\"start\">\n          <ion-back-button></ion-back-button>\n        </ion-buttons>\n    <ion-title style=\"text-align: center;\">{{tv.name}}</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n    <iframe id=\"iplayer\" name=\"iplayer\" allowtransparency=\"true\" allowfullscreen webkitallowfullscreen\n    mozallowfullscreen oallowfullscreen msallowfullscreen border=\"0\" marginwidth=\"0\" marginheight=\"0\" hspace=\"0\"\n      vspace=\"0\" frameborder=\"0\" scrolling=\"no\" [src]=\"safeUrl\" width=\"100%\" height=\"48%\" rel=\"nofollow\"></iframe>\n    <ion-label>\n      <!-- <p>\n        <span class=\"c01\">收视率：<span class=\"c02\">{{tv.ratings}}</span></span>&nbsp;&nbsp;<span class=\"c01\">今日：<span\n            class=\"c02\">{{tv.today}}</span></span>&nbsp;&nbsp;<span class=\"c01\">爱看度：<span\n            class=\"c02\">{{tv.good_looking_rate}}</span></span>\n      </p> -->\n      <p>\n        <span class=\"c01\">类型1：<span class=\"c02\">{{tv.type}}</span></span>&nbsp;&nbsp;<span class=\"c01\">类型2：<span class=\"c02\">{{tv.type2}}</span></span>\n      </p>\n      <p style=\"color: #999;\">\n        <span class=\"c01\">{{tv.name}}介绍：</span>\n        <span class=\"c02\">{{tv.description}}</span>\n      </p>\n    </ion-label>\n</ion-content>"

/***/ }),

/***/ "./src/app/piece-detail/piece-detail.page.scss":
/*!*****************************************************!*\
  !*** ./src/app/piece-detail/piece-detail.page.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BpZWNlLWRldGFpbC9waWVjZS1kZXRhaWwucGFnZS5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/piece-detail/piece-detail.page.ts":
/*!***************************************************!*\
  !*** ./src/app/piece-detail/piece-detail.page.ts ***!
  \***************************************************/
/*! exports provided: PieceDetailPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PieceDetailPage", function() { return PieceDetailPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../storage.service */ "./src/app/storage.service.ts");
/* harmony import */ var _tools_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../tools.service */ "./src/app/tools.service.ts");
/* harmony import */ var _config_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../config.service */ "./src/app/config.service.ts");







var PieceDetailPage = /** @class */ (function () {
    function PieceDetailPage(storage, tools, config, activeRoute, sanitizer) {
        var _this = this;
        this.storage = storage;
        this.tools = tools;
        this.config = config;
        this.activeRoute = activeRoute;
        this.sanitizer = sanitizer;
        this.activeRoute.queryParams.subscribe(function (params) {
            // 获取小品_id
            _this._id = params['_id'];
            // 获取小品播放地址
            _this.url = params['url'];
            // 获取小品信息
            _this.getPiece();
        });
    }
    PieceDetailPage.prototype.ngOnInit = function () {
    };
    /**
     * 获取小品信息
     */
    PieceDetailPage.prototype.getPiece = function () {
        var _this = this;
        this.tools.getPieceByIdApi(this._id).then(function (data) {
            _this.tv = data.data;
            if (_this.url == null) {
                _this.url = _this.tv.url;
            }
            _this.changePieceType(_this._id, _this.url);
            _this.safeUrl = _this.sanitizer.bypassSecurityTrustResourceUrl(_this.config.piece + _this.url);
        });
    };
    /**
     * 改变小品类型
     * @param _id 小品id
     * @param url 小品地址
     */
    PieceDetailPage.prototype.changePieceType = function (_id, url) {
        this._id = _id;
        this.url = url;
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.config.drama + this.url);
        // 保存浏览记录
        this.saveBrowseRecords();
    };
    /**
     * 保存浏览记录
     */
    PieceDetailPage.prototype.saveBrowseRecords = function () {
        // 浏览的影视类型
        var browseType = 'piece';
        // 影视id
        var id = this.tv._id;
        // 影视名称
        var name = this.tv.name;
        // 影视第一种类型
        var type = this.tv.type;
        // 影视第二种类型
        var type2 = this.tv.type2;
        if (type2 == null) {
            type2 == '';
        }
        // 影视海报地址
        var src = this.tv.src;
        // 播放地址
        var url = this.url;
        this.tools.addRecordsApi(browseType, id, name, type, type2, src, url);
    };
    PieceDetailPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-piece-detail',
            template: __webpack_require__(/*! ./piece-detail.page.html */ "./src/app/piece-detail/piece-detail.page.html"),
            styles: [__webpack_require__(/*! ./piece-detail.page.scss */ "./src/app/piece-detail/piece-detail.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_storage_service__WEBPACK_IMPORTED_MODULE_4__["StorageService"],
            _tools_service__WEBPACK_IMPORTED_MODULE_5__["ToolsService"],
            _config_service__WEBPACK_IMPORTED_MODULE_6__["ConfigService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"]])
    ], PieceDetailPage);
    return PieceDetailPage;
}());



/***/ })

}]);
//# sourceMappingURL=piece-detail-piece-detail-module.js.map