import { CatalogFields, BuyBoxPageResponse, RawBuyBoxListing } from "./interal-types"
import axios from 'axios'
import { getCatalogString } from "./utils"
import { BuyboxListing, BuyboxPage, CountryCode } from "."


export class BackMarketAPI {

    /**
     * The root endpoint of the api.
     */
    private rootEndpoint: string

    /**
     * Headers that will be used in each request, since each request requires the same headers.
     */
    private headers: Record<string, string>

    constructor(
        websiteURL: string,
        countryCode: CountryCode,
        userAgent: string,
        accessToken: string
    ) {
        this.rootEndpoint = websiteURL
        this.headers = {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Accept-Language': countryCode,
            'Authorization': `Basic ${accessToken}`,
            'User-Agent': userAgent
        }
    }

    /**
     * This method formats an error from BackMarket so that it is error handling friendly.
     * @param err An axios response error
     * @returns A rejected Promise
     */
    private transformErr(err: any): Promise<any> {
        const hasStatusCode = typeof err.response.status === 'number'
        const hasStatusText = typeof err.response.statusText === 'string'
        if (hasStatusCode && hasStatusText) {
            const error: any = new Error(err.response.statusText)
            error.code = err.response.status
            return Promise.reject(error)
        } else {
            return Promise.reject(err)
        }
    }

    /**
     * This method formats a raw buybox page to a better formatted type.
     * @param pageNum The page's number
     * @param page The page response
     * @returns A formatted page containing buybox information.
     */
    private mapBuyboxPage(pageNum: number, page: BuyBoxPageResponse): BuyboxPage {
        return {
            pageNumber: pageNum,
            pageCount: page.count,
            nextPage: page.next != undefined ? pageNum + 1 : undefined, //Don't use strict equal
            prevPage: page.previous != undefined ? pageNum - 1 : undefined, //Don't use strict equal
            results: page.results.map(this.mapBuyboxData)
        }
    }

    /**
     * This method formats a buybox listing to a better formatted type.
     * @param listing A buybox listing
     * @returns A formatted buy box listing
     */
    private mapBuyboxData(listing: RawBuyBoxListing): BuyboxListing {
        return {
            productID: listing.product,
            sku: listing.sku,
            quantity: listing.quantity,
            price: Number(listing.price),
            hasBuyBox: listing.buybox,
            priceForBuybox: listing.price_for_buybox,
            currency: listing.currency,
            condition: listing.condition
        }
    }

    /**
     * This method gets the most recent buy box information from BackMarket.
     * This method is limited to one call for each page per hour. Otherwise a 429 error will be thrown.
     * @param page The page of buybox data to retrieve.
     * @returns A buybox page.
     */
    getBuyboxData(page: number): Promise<BuyboxPage> {
        return axios.get(
            `${this.rootEndpoint}/ws/listings_bi/?page=${page}`,
            { headers: this.headers }
        ).then(resp => {
            const data = resp.data as BuyBoxPageResponse
            return this.mapBuyboxPage(page, data)
        }).catch(this.transformErr)
    }

    /**
     * This method is for updating multiple listings in one request.
     * NOTE: Not all fields present in one listing need to be present for another listing in the array. 
     * (quantity can be undefined in one element while quantity is undefined in another)
     * @param fields An array where each element is an object containing all of the available fields that may be updated for each listing.
     * @returns An empty promise.
     */
    updateListingBulk(fields: CatalogFields[]): Promise<void> {
        const delimiter = ';'
        return axios.post(
            `${this.rootEndpoint}/ws/listings`,
            {
                'encoding': 'latin1',
                'delimiter': delimiter,
                'quotechar': '"',
                'header': true,
                'catalog': getCatalogString(fields, delimiter)
            },
            {
                headers: this.headers
            }
        ).then(() => {
            return //To prevent the axios response from being returned
        }).catch(this.transformErr)
    }



}