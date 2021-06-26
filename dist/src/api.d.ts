import { Language, BuyBoxPage, CatalogFields } from "./types";
export declare class BackMarketAPI {
    /**
     * The root endpoint of the api.
     */
    private rootEndpoint;
    /**
     * Headers that will be used in each request, since each request requires the same headers.
     */
    private headers;
    constructor(websiteURL: string, language: Language, userAgent: string, accessToken: string);
    getBuyBoxData(page: number): Promise<BuyBoxPage>;
    updateListingBulk(fields: CatalogFields[]): Promise<void>;
}
