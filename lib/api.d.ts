import { CatalogFields } from "./interal-types";
import { BuyboxPage, CountryCode } from ".";
export declare class BackMarketAPI {
    /**
     * The root endpoint of the api.
     */
    private rootEndpoint;
    /**
     * Headers that will be used in each request, since each request requires the same headers.
     */
    private headers;
    constructor(websiteURL: string, countryCode: CountryCode, userAgent: string, accessToken: string);
    /**
     * This method formats an error from BackMarket so that it is error handling friendly.
     * @param err An axios response error
     * @returns A rejected Promise
     */
    private transformErr;
    /**
     * This method formats a raw buybox page to a better formatted type.
     * @param pageNum The page's number
     * @param page The page response
     * @returns A formatted page containing buybox information.
     */
    private mapBuyboxPage;
    /**
     * This method formats a buybox listing to a better formatted type.
     * @param listing A buybox listing
     * @returns A formatted buy box listing
     */
    private mapBuyboxData;
    /**
     * This method gets the most recent buy box information from BackMarket.
     * This method is limited to one call for each page per hour. Otherwise a 429 error will be thrown.
     * @param page The page of buybox data to retrieve.
     * @returns A buybox page.
     */
    getBuyboxData(page: number): Promise<BuyboxPage>;
    /**
     * This method is for updating multiple listings in one request.
     * NOTE: Not all fields present in one listing need to be present for another listing in the array.
     * (quantity can be undefined in one element while quantity is undefined in another)
     * @param fields An array where each element is an object containing all of the available fields that may be updated for each listing.
     * @returns An empty promise.
     */
    updateListingBulk(fields: CatalogFields[]): Promise<void>;
}
