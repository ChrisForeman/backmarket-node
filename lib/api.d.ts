import { BackMarketAPIInterface } from "./api-interface";
import { CountryCode } from "./enums";
import { BuyBoxData, Category, Order, OrderLineUpdateData } from "./types";
export declare class BackMarketAPI implements BackMarketAPIInterface {
    /**
     * The root endpoint of the api.
     */
    private rootEndpoint;
    /**
     * Headers that will be used in each request, since each request requires the same headers.
     */
    private headers;
    private mapper;
    constructor(websiteURL: string, countryCode: CountryCode, userAgent: string, accessToken: string);
    getCategoryTree(): Promise<Category[]>;
    getBuyBoxDataRange(startPage: number, endPage?: number): Promise<{
        count: number;
        results: BuyBoxData[];
    }>;
    private condenseBuyBoxPages;
    getBuyBoxData(page: number): Promise<{
        count: number;
        results: BuyBoxData[];
    }>;
    updateOrderLine(orderLineId: number, data: OrderLineUpdateData): Promise<void>;
    getOrder(orderId: number): Promise<Order>;
}
