import { CatalogFields, BuyBoxPageResponse, RawBuyBoxListing, UpdateListingFields } from "./interal-types"
import axios from 'axios'
import { getCatalogString } from "./utils"
import { BuyboxListing, BuyboxPage, CountryCode, ErrorCode } from "."


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
     * This method uses a modified binary search approach to calculate the next page that should be requested.
     * @param high The highest pages that may be the last buybox page.
     * @param low The lowest page that may be the last buybox page.
     * @param target The page that was requested.
     * @param exists A boolean that is true if the target page exists.
     * @returns Returns the next page that should be requested.
     */
    private nextTarget(high: number, low: number, target: number, exists: boolean): number {
        if (exists) {
            //Because the range between target and high may initially be astronomical,
            //we will consider the new target to be double its current value.
            const maxNewTarget = high - Math.trunc((high - target) / 2)
            return Math.min(target * 2, maxNewTarget)
        } else {
            return target - Math.trunc((target - low) / 2)
        }
    }

    /**
     * Helper method that requests buy box pages until it finds the last one.
     * Since we don't have a known range for how many buybox pages exist it requests pages in a modified binary search fashion 
     * and converges on the last page with every request. 
     * @param estPages The estimated amount of buybox pages the seller has.
     * @param maxPages The max amount of pages to request for. The default value is infinity.
     * @returns The last page for buybox data, a set of failed page numbers, and the buybox data that was retrieved while searching since this endpoint can only be called once per hour per page.
     */
    private async getLastBuyBoxPage(estPages?: number, maxPages?: number): Promise<{
        pages: BuyboxPage[],
        validFailedPages: Set<number>,
        lastPage: number
    }> {
        let high = maxPages ?? Number.MAX_SAFE_INTEGER
        let low = 1
        let targetPage = estPages ?? 10

        const pages: BuyboxPage[] = []
        const validFailedPages = new Set<number>() //Failed pages that exist.

        while (high - low > 1) {
            let pageExists = true
            await this.getBuyboxData(targetPage).then(data => {
                pages.push(data)
            }).catch(err => {
                if (err.code === ErrorCode.tooManyCalls) { //Only error code that proves the page exists.
                    validFailedPages.add(targetPage)
                } else {
                    pageExists = false
                }
            })

            const newTarget = this.nextTarget(high, low, targetPage, pageExists)

            newTarget > targetPage ? low = targetPage : high = targetPage

            targetPage = newTarget
        }

        return Promise.resolve({
            pages: pages,
            validFailedPages: validFailedPages,
            lastPage: targetPage
        })
    }


    /**
     * Convenience method for getting mutiple/all pages of buybox data in one async method call.
     * If maxPages is not set, this method will get all available buybox pages.
     * @param estPages The estimated number of buybox pages the seller has.
     * @param maxPages The maximum number of pages to get.
     * @returns The last page for buybox data, a set of failed page numbers, and the buybox
     * data that was retrieved while searching since this endpoint can only be called once per hour per page.
     */
    async getAllBuyboxData(estPages: number, maxPages?: number): Promise<{
        pages: BuyboxPage[];
        validFailedPages: Set<number>;
        lastPage: number;
    }> {

        const results = await this.getLastBuyBoxPage(estPages, maxPages)

        //Fill in pages that weren't retrieved when calculating the valid page range.

        const pageNums: number[] = Array.from(Array(results.lastPage).keys())
        pageNums.shift() //Start page at one and remove an element.

        const requestedPages: Set<number> = Object.assign({}, results.validFailedPages)
        results.pages.forEach(page => { requestedPages.add(page.pageNumber) })

        await Promise.all(pageNums.map(pageNum => {
            if (!requestedPages.has(pageNum)) {
                return this.getBuyboxData(pageNum).then(data => {
                    results.pages.push(data)
                }).catch(() => {
                    results.validFailedPages.add(pageNum)
                })
            } else {
                return Promise.resolve()
            }
        }))

        return results
    }


    /**
     * Method for updating properties of a product listing.
     * @param listingID Unique listing ID provided by Back Market.
     * @param fields Fields to update in the listing. 
     * @returns An empty promise on success.
     */
    updateListing(listingID: number, fields: UpdateListingFields): Promise<void> {
        return axios.post(
            `${this.rootEndpoint}/ws/listings/${listingID}`,
            fields,
            { headers: this.headers }
        ).then(() => {
            return //To prevent the axios response from being returned
        }).catch(this.transformErr)
    }

    /**
     * This method is for updating multiple listings in one request.
     * NOTE: This method is not as efficient as single listing and won't be in real time.
     * It is also not recommended to update stock with this method. 
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