(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tv-detail-tv-detail-module"],{

/***/ "./src/app/tv-detail/tv-detail.module.ts":
/*!***********************************************!*\
  !*** ./src/app/tv-detail/tv-detail.module.ts ***!
  \***********************************************/
/*! exports provided: TvDetailPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TvDetailPageModule", function() { return TvDetailPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _tv_detail_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tv-detail.page */ "./src/app/tv-detail/tv-detail.page.ts");







var routes = [
    {
        path: '',
        component: _tv_detail_page__WEBPACK_IMPORTED_MODULE_6__["TvDetailPage"]
    }
];
var TvDetailPageModule = /** @class */ (function () {
    function TvDetailPageModule() {
    }
    TvDetailPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_tv_detail_page__WEBPACK_IMPORTED_MODULE_6__["TvDetailPage"]]
        })
    ], TvDetailPageModule);
    return TvDetailPageModule;
}());



/***/ }),

/***/ "./src/app/tv-detail/tv-detail.page.html":
/*!***********************************************!*\
  !*** ./src/app/tv-detail/tv-detail.page.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar color=\"danger\">\n    <ion-buttons slot=\"start\">\n      <ion-back-button></ion-back-button>\n    </ion-buttons>\n    <ion-title style=\"text-align: center;\">{{tv.name}}</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n\n    <link rel=\"stylesheet\" type=\"text/css\" href=\"https://m.88ys.cc/template/wap88ysw/css/tv.detail.css\">\n\n  <!-- 影视详情 -->\n  <section class=\"main\">\n    <!-- 详细信息 -->\n    <div class=\"detailPosterIntro globalPadding clearfix\">\n      <div class=\"posterPic\"><img [src]=\"tv.src\" alt=\"{{tv.name}}\" onerror=\"this.src='http://149.129.94.197:8085/assets/img/load.gif'\">\n      </div>\n      <div class=\"introTxt\">\n        <h1>{{tv.name}}</h1>\n        <li>类型：{{tv.type}}</li>\n        <li>更新时间：{{tv.acquisition_time}}</li>\n      </div>\n    </div>\n\n    <!-- 资源列表 -->\n    <div class=\"tab globalPadding\">\n      <ul class=\"tabNav clearfix\">\n        <li><span class=\"cur\" (click)=\"oooTab2(0)\">剧集</span></li>\n        <li><span class=\"\" (click)=\"oooTab2(1)\">简介</span></li>\n      </ul>\n    </div>\n    <div class=\"tabConList globalPadding\">\n      <div class=\"tabCon\" style=\"display: block;\">\n        <dl class=\"tab2\">\n          <!-- 资源名称列表 -->\n          <dt class=\"tabt3\">\n            <div *ngFor=\"let source of tv.sources,let i = index\">\n              <span id=\"{{source.name}}\" class=\"current\" (click)=\"oooTab(source.name, i)\"\n                *ngIf=\"i == source_index\">{{source.name}}</span>\n              <span id=\"{{source.name}}\" (click)=\"oooTab(source.name, i)\"\n                *ngIf=\"i != source_index\">{{source.name}}</span>\n            </div>\n          </dt>\n          <!-- 资源播放地址列表 -->\n          <div *ngFor=\"let source of tv.sources,let i = index\">\n            <dd class=\"{{source.name}}\" style=\"display: block;\" *ngIf=\"i == source_index\">\n              <ul class=\"ulNumList clearfix list_1\">\n                <li (click)=\"changeMovieType(_id, i, j)\" *ngFor=\"let type of source.types,let j = index\"> <a\n                    title=\"{{type.name}}\">{{type.name}}</a></li>\n              </ul>\n            </dd>\n            <dd class=\"{{source.name}}\" style=\"display: none;\" *ngIf=\"i != source_index\">\n              <ul class=\"ulNumList clearfix list_1\">\n                <li (click)=\"changeMovieType(_id, i, j)\" *ngFor=\"let type of source.types,let j = index\"> <a\n                    title=\"{{type.name}}\">{{type.name}}</a></li>\n              </ul>\n            </dd>\n          </div>\n        </dl>\n      </div>\n      <div class=\"tabCon\" style=\"display: none;\">\n        <p class=\"movieintro\" id=\"movie_info_intro_s\"><span style=\"color:#333;\">剧情简介：</span>{{tv.introduction}}</p>\n      </div>\n    </div>\n  </section>\n\n</ion-content>"

/***/ }),

/***/ "./src/app/tv-detail/tv-detail.page.scss":
/*!***********************************************!*\
  !*** ./src/app/tv-detail/tv-detail.page.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".detailPosterIntro .introTxt {\n  height: auto; }\n\nh1 {\n  margin-top: auto; }\n\n.globalPadding {\n  padding-left: 0px; }\n\n.introTxt h1 {\n  list-style: none;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden; }\n\n.introTxt span {\n  font: 12px/1.5 Arial,\\5FAE\\8F6F\\96C5\\9ED1;\n  display: inline-block; }\n\nion-segment-button button {\n  padding: 0px; }\n\n.tab2 dt span.current {\n  background: #f04141; }\n\n.tab2 dd {\n  border-top: 1px solid #f04141; }\n\n.tab {\n  height: 62px;\n  line-height: 48px;\n  font-size: 21px;\n  padding-bottom: 0px; }\n\n.ulNumList li {\n  width: auto; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy93ZWlwZW5nL1BlcnNvbmFsL1Byb2plY3RzL1BvY2tldEZpbG0vTW9iaWxlL1BvY2tldEZpbG0vc3JjL2FwcC90di1kZXRhaWwvdHYtZGV0YWlsLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFlBQVksRUFBQTs7QUFHZDtFQUNFLGdCQUFnQixFQUFBOztBQUdsQjtFQUNFLGlCQUFpQixFQUFBOztBQUduQjtFQUNFLGdCQUFnQjtFQUNoQix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLGdCQUFnQixFQUFBOztBQUdsQjtFQUNJLHlDQUF5QztFQUN6QyxxQkFBcUIsRUFBQTs7QUFHekI7RUFDSSxZQUFZLEVBQUE7O0FBR2hCO0VBQ0ksbUJBQW1CLEVBQUE7O0FBR3ZCO0VBQ0ksNkJBQTZCLEVBQUE7O0FBR2pDO0VBQ0ksWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixlQUFlO0VBQ2YsbUJBQW1CLEVBQUE7O0FBR3ZCO0VBQ0UsV0FBVyxFQUFBIiwiZmlsZSI6InNyYy9hcHAvdHYtZGV0YWlsL3R2LWRldGFpbC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZGV0YWlsUG9zdGVySW50cm8gLmludHJvVHh0IHtcbiAgICBoZWlnaHQ6IGF1dG87XG4gIH1cbiAgXG4gIGgxIHtcbiAgICBtYXJnaW4tdG9wOiBhdXRvO1xuICB9XG4gIFxuICAuZ2xvYmFsUGFkZGluZyB7XG4gICAgcGFkZGluZy1sZWZ0OiAwcHg7XG4gIH1cbiAgXG4gIC5pbnRyb1R4dCBoMSB7XG4gICAgbGlzdC1zdHlsZTogbm9uZTtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gIH1cbiAgXG4gIC5pbnRyb1R4dCBzcGFuIHtcbiAgICAgIGZvbnQ6IDEycHgvMS41IEFyaWFsLFxcNUZBRVxcOEY2RlxcOTZDNVxcOUVEMTtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgfVxuICBcbiAgaW9uLXNlZ21lbnQtYnV0dG9uIGJ1dHRvbiB7XG4gICAgICBwYWRkaW5nOiAwcHg7XG4gIH1cbiAgXG4gIC50YWIyIGR0IHNwYW4uY3VycmVudCB7XG4gICAgICBiYWNrZ3JvdW5kOiAjZjA0MTQxO1xuICB9XG4gIFxuICAudGFiMiBkZCB7XG4gICAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2YwNDE0MTtcbiAgfVxuICBcbiAgLnRhYiB7XG4gICAgICBoZWlnaHQ6IDYycHg7XG4gICAgICBsaW5lLWhlaWdodDogNDhweDtcbiAgICAgIGZvbnQtc2l6ZTogMjFweDtcbiAgICAgIHBhZGRpbmctYm90dG9tOiAwcHg7XG4gIH1cblxuICAudWxOdW1MaXN0IGxpIHtcbiAgICB3aWR0aDogYXV0bztcbiAgfSJdfQ== */"

/***/ }),

/***/ "./src/app/tv-detail/tv-detail.page.ts":
/*!*********************************************!*\
  !*** ./src/app/tv-detail/tv-detail.page.ts ***!
  \*********************************************/
/*! exports provided: TvDetailPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TvDetailPage", function() { return TvDetailPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _storage_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../storage.service */ "./src/app/storage.service.ts");
/* harmony import */ var _tools_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../tools.service */ "./src/app/tools.service.ts");
/* harmony import */ var _config_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../config.service */ "./src/app/config.service.ts");







var TvDetailPage = /** @class */ (function () {
    function TvDetailPage(storage, tools, config, activeRoute, router, sanitizer) {
        var _this = this;
        this.storage = storage;
        this.tools = tools;
        this.config = config;
        this.activeRoute = activeRoute;
        this.router = router;
        this.sanitizer = sanitizer;
        this.source_index = 0;
        this.type_index = 0;
        // 浏览类型
        this.browseType = 'tv';
        this.activeRoute.queryParams.subscribe(function (params) {
            // 获取电视_id
            _this._id = params['_id'];
            _this.url = params['url'];
            // 获取电视信息
            _this.getTv();
        });
    }
    TvDetailPage.prototype.ngOnInit = function () {
    };
    /**
     * 切换视频播放资源列表
     * @param id 资源列表名称
     */
    TvDetailPage.prototype.oooTab = function (id, source_index) {
        this.source_index = source_index;
        this.tools.oooTab(id);
    };
    /**
     * 切换资源列表与简介
     * @param id 资源列表或简介id
     */
    TvDetailPage.prototype.oooTab2 = function (id) {
        this.tools.oooTab2(id);
    };
    /**
     * 根据视频资源创造视频资源(适用于电视)
     * @param sources 视频资源
     */
    TvDetailPage.prototype.createSourcesBySources = function (sources) {
        var newSources = [];
        for (var i = 0; i < sources.length; i++) {
            var type = { 'name': sources[i].name, 'url': sources[i].url };
            var types = [type];
            var source = { 'name': sources[i].name, 'types': types };
            newSources[i] = source;
        }
        this.tv.sources = newSources;
    };
    /**
     * 获取电视信息
     */
    TvDetailPage.prototype.getTv = function () {
        var _this = this;
        this.tools.getTvByIdApi(this._id).then(function (data) {
            _this.tv = data.data;
            if (_this.url == null) {
                _this.url = _this.tv.sources[0].url;
                _this.createSourcesBySources(_this.tv.sources);
                _this.source_count = _this.tv.sources.length;
                _this.safeUrl = _this.sanitizer.bypassSecurityTrustResourceUrl(_this.config.tv + _this.url);
            }
        });
    };
    /**
     * 修改影视类型
     * @param url   影视地址
     */
    TvDetailPage.prototype.changeMovieType = function (_id, source_index, type_index) {
        var result = this.tools.checkUser();
        if (result) {
            // 保存浏览记录
            this.saveBrowseRecords();
            //  播放视频
            this.router.navigate(['/play'], {
                queryParams: {
                    _id: _id,
                    source_index: source_index,
                    type_index: type_index,
                    browseType: this.browseType,
                }
            });
        }
    };
    /**
     * 保存浏览记录
     */
    TvDetailPage.prototype.saveBrowseRecords = function () {
        // 浏览的影视类型
        var browseType = 'tv';
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
    TvDetailPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-tv-detail',
            template: __webpack_require__(/*! ./tv-detail.page.html */ "./src/app/tv-detail/tv-detail.page.html"),
            styles: [__webpack_require__(/*! ./tv-detail.page.scss */ "./src/app/tv-detail/tv-detail.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_storage_service__WEBPACK_IMPORTED_MODULE_4__["StorageService"],
            _tools_service__WEBPACK_IMPORTED_MODULE_5__["ToolsService"],
            _config_service__WEBPACK_IMPORTED_MODULE_6__["ConfigService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["DomSanitizer"]])
    ], TvDetailPage);
    return TvDetailPage;
}());



/***/ })

}]);
//# sourceMappingURL=tv-detail-tv-detail-module.js.map