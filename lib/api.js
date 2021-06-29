"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackMarketAPI = void 0;
const axios_1 = require("axios");
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
    }
    /**
     * This method formats an error from BackMarket so that it is error handling friendly.
     * @param err An axios response error
     * @returns A rejected Promise
     */
    transformErr(err) {
        const hasStatusCode = typeof err.response.status === 'number';
        const hasStatusText = typeof err.response.statusText === 'string';
        if (hasStatusCode && hasStatusText) {
            const error = new Error(err.response.statusText);
            error.code = err.response.status;
            return Promise.reject(error);
        }
        else {
            return Promise.reject(err);
        }
    }
    /**
     * This method formats a raw buybox page to a better formatted type.
     * @param pageNum The page's number
     * @param page The page response
     * @returns A formatted page containing buybox information.
     */
    mapBuyboxPage(pageNum, page) {
        return {
            pageNumber: pageNum,
            pageCount: page.count,
            nextPage: page.next !== undefined ? pageNum + 1 : undefined,
            prevPage: page.previous !== undefined ? pageNum - 1 : undefined,
            results: page.results.map(this.mapBuyboxData)
        };
    }
    /**
     * This method formats a buybox listing to a better formatted type.
     * @param listing A buybox listing
     * @returns A formatted buy box listing
     */
    mapBuyboxData(listing) {
        return {
            productID: listing.product,
            sku: listing.sku,
            quantity: listing.quantity,
            price: Number(listing.price),
            hasBuyBox: listing.buybox,
            priceForBuybox: listing.price_for_buybox,
            currency: listing.currency,
            condition: listing.condition
        };
    }
    /**
     * This method gets the most recent buy box information from BackMarket.
     * This method is limited to one call for each page per hour. Otherwise a 429 error will be thrown.
     * @param page The page of buybox data to retrieve.
     * @returns A buybox page.
     */
    getBuyboxData(page) {
        return axios_1.default.get(`${this.rootEndpoint}/ws/listings_bi/?page=${page}`, { headers: this.headers }).then(resp => {
            const data = resp.data;
            return this.mapBuyboxPage(page, data);
        }).catch(this.transformErr);
    }
    /**
     * This method is for updating multiple listings in one request.
     * NOTE: Not all fields present in one listing need to be present for another listing in the array.
     * (quantity can be undefined in one element while quantity is undefined in another)
     * @param fields An array where each element is an object containing all of the available fields that may be updated for each listing.
     * @returns An empty promise.
     */
    updateListingBulk(fields) {
        const delimiter = ';';
        return axios_1.default.post(`${this.rootEndpoint}/ws/listings`, {
            'encoding': 'latin1',
            'delimiter': delimiter,
            'quotechar': '"',
            'header': true,
            'catalog': utils_1.getCatalogString(fields, delimiter)
        }, {
            headers: this.headers
        }).then(() => {
            return; //To prevent the axios response from being returned
        }).catch(this.transformErr);
    }
}
exports.BackMarketAPI = BackMarketAPI;
