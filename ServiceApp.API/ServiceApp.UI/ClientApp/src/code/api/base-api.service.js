"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseApiService = /** @class */ (function () {
    function BaseApiService(http) {
        this.http = http;
    }
    BaseApiService.prototype.post = function (url, body) {
        return this.http.post(url, JSON.stringify(body));
    };
    BaseApiService.prototype.get = function (url) {
        return this.http.get(url);
    };
    BaseApiService.prototype.put = function (url, body) {
        return this.http.put(url, JSON.stringify(body));
    };
    BaseApiService.prototype.delete = function (url) {
        return this.http.delete(url);
    };
    BaseApiService.prototype.getPromise = function (url) {
        return this.http.get(url).toPromise();
    };
    return BaseApiService;
}());
exports.BaseApiService = BaseApiService;
//# sourceMappingURL=base-api.service.js.map