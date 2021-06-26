"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackMarketAPI = void 0;
const axios_1 = require("axios");
const utils_1 = require("./utils");
class BackMarketAPI {
    constructor(websiteURL, language, userAgent, accessToken) {
        this.rootEndpoint = websiteURL;
        this.headers = {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Accept-Language': language,
            'Authorization': `Basic ${accessToken}`,
            'User-Agent': userAgent
        };
    }
    getBuyBoxData(page) {
        return axios_1.default.get(`${this.rootEndpoint}/ws/listings_bi/?page=${page}`, { headers: this.headers }).then(resp => {
            return resp.data;
        });
    }
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
        }).then(() => { return; });
    }
}
exports.BackMarketAPI = BackMarketAPI;
