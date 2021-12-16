"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackMarketAPI = void 0;
const axios = require("axios");
const response_mapper_1 = require("./response-mapper");
const utils_1 = require("./utils");
class BackMarketAPI {
    constructor(websiteURL, countryCode, userAgent, accessToken) {
        this.rootEndpoint = websiteURL;
        this.headers = {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Accept-Language': countryCode,
            'Authorization': `Basic ${accessToken}`,
            'User-Agent': userAgent
        };
        this.mapper = new response_mapper_1.ResponseMapper();
    }
    getCategoryTree() {
        return axios.default.get(`${this.rootEndpoint}/category/tree`, { headers: this.headers }).then(res => {
            return res.data;
        });
    }
    getBuyBoxDataRange(startPage, endPage) {
        return __awaiter(this, void 0, void 0, function* () {
            if (endPage === undefined) {
                const firstPage = yield this.getBuyBoxData(startPage);
                const pageSize = 10;
                const newStartPage = startPage + 1;
                const newEndPage = Math.trunc(firstPage.count / pageSize) + 1;
                const pageNums = utils_1.indexArray(newStartPage, newEndPage - newStartPage + 1);
                const buyBoxPages = yield Promise.all(pageNums.map(page => this.getBuyBoxData(page)));
                return this.condenseBuyBoxPages(buyBoxPages);
            }
            else {
                if (startPage < endPage) {
                    throw new Error('End page cannot be less than start page.');
                }
                const pageNums = utils_1.indexArray(startPage, endPage - startPage + 1);
                const buyBoxPages = yield Promise.all(pageNums.map(page => this.getBuyBoxData(page)));
                return this.condenseBuyBoxPages(buyBoxPages);
            }
        });
    }
    condenseBuyBoxPages(pages) {
        let count = 0;
        const results = [];
        pages.forEach(page => {
            count = page.count;
            page.results.forEach(pageResult => {
                results.push(pageResult);
            });
        });
        return {
            count: count,
            results: results
        };
    }
    getBuyBoxData(page) {
        return axios.default.get(`${this.rootEndpoint}/ws/listings_bi/?page=${page}`, { headers: this.headers }).then(res => {
            return {
                count: res.data.count,
                results: res.data.results.map((buybox) => this.mapper.mapBuyBox(buybox))
            };
        }).catch(err => {
            throw this.mapper.mappErr(err);
        });
    }
    updateOrderLine(orderLineId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield axios.default.patch(`${this.rootEndpoint}/ws/orderlines/${orderLineId}`, data, { headers: this.headers });
        });
    }
    getOrder(orderId) {
        return axios.default.get(`${this.rootEndpoint}/ws/orders/${orderId}`, { headers: this.headers }).then(res => {
            return this.mapper.mapOrder(res.data);
        });
    }
}
exports.BackMarketAPI = BackMarketAPI;
