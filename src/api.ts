import { BackMarketAPIInterface } from "./api-interface"
import * as axios from 'axios'
import { CountryCode } from "./enums"

export class BackMarketAPI implements BackMarketAPIInterface {

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

    getCategoryTree(): Promise<Category[]> {
        return axios.default.get(
            `${this.rootEndpoint}/category/tree`,
            { headers: this.headers }
        ).then(res => {
            return res.data as Category[]
        })
    }

    getCategoryBranch(categoryId: string): Promise<Category> {
        throw new Error("Method not implemented.")
    }
    getListingsAll(params: { publicationState?: number, minQuantity?: number, maxQuantity?: number, }): Promise<Listing[]> {
        throw new Error("Method not implemented.")
    }
    getListingsRange(params: { startPage: number, endPage?: number, publicationState?: number, minQuantity?: number, maxQuantity?: number, }): Promise<Listing[]> {
        throw new Error("Method not implemented.")
    }
    getListingsPage(params: { page: number, publicationState?: number, minQuantity?: number, maxQuantity?: number, }): Promise<Listing[]> {
        throw new Error("Method not implemented.")
    }
    getBuyBoxDataAll(): Promise<BuyBoxData[]> {
        throw new Error("Method not implemented.")
    }
    getBuyBoxDataRange(startPage: number, endPage?: number): Promise<BuyBoxData[]> {
        throw new Error("Method not implemented.")
    }
    getBuyBoxDataPage(page: number): Promise<BuyBoxData[]> {
        throw new Error("Method not implemented.")
    }
    getListingById(listingId: number): Promise<Listing> {
        throw new Error("Method not implemented.")
    }
    getListingBySku(sku: string): Promise<Listing> {
        throw new Error("Method not implemented.")
    }
    getOrdersAll(params: { creationDate?: Date, paymentDate?: Date, modificationDate?: Date, countryCode?: any, state?: any, pageSize?: number, }): Promise<Order> {
        throw new Error("Method not implemented.")
    }
    getOrdersRange(params: { page: number, creationDate?: Date, paymentDate?: Date, modificationDate?: Date, countryCode?: any, state?: any, pageSize?: number, }): Promise<Order> {
        throw new Error("Method not implemented.")
    }
    getOrdersPage(params: { startPage: number, endPage?: number, creationDate?: Date, paymentDate?: Date, modificationDate?: Date, countryCode?: any, state?: any, pageSize?: number, }): Promise<Order> {
        throw new Error("Method not implemented.")
    }
    getOrder(orderId: number): Promise<Order> {
        throw new Error("Method not implemented.")
    }
    getBatch(batchID: number): Promise<any> {
        throw new Error("Method not implemented.")
    }
    getRepairReturnsAll(): Promise<any[]> {
        throw new Error("Method not implemented.")
    }
    getRepairReturnsRange(startPage: number, endPage?: number): Promise<any[]> {
        throw new Error("Method not implemented.")
    }
    getRepairReturnsPage(page: number): Promise<any[]> {
        throw new Error("Method not implemented.")
    }
    createListings(data: ListingCreationData[]): Promise<void> {
        throw new Error("Method not implemented.")
    }
    updateListing(listingId: number, data: ListingUpdateData): Promise<void> {
        throw new Error("Method not implemented.")
    }
    updateListingsBatch(data: ListingUpdateData[]): Promise<void> {
        throw new Error("Method not implemented.")
    }
    updateOrder(orderId: number, data: OrderUpdateData): Promise<void> {
        throw new Error("Method not implemented.")
    }
    updateOrderLine(orderLineId: number, data: OrderLineUpdateData): Promise<void> {
        throw new Error("Method not implemented.")
    }
    getDeliveryShippingLabelsAll(params: { pageSize?: number, orderId?: number, orderState?: any, hubScanned?: boolean, startDate?: Date, endDate?: Date, pickupStartDate?: Date, pickupEndDate?: Date, }): Promise<any[]> {
        throw new Error("Method not implemented.")
    }
    getDeliveryShippingLabelsRange(params: { startPage: number, endPage?: number, pageSize?: number, orderId?: number, orderState?: any, hubScanned?: boolean, startDate?: Date, endDate?: Date, pickupStartDate?: Date, pickupEndDate?: Date, }): Promise<any[]> {
        throw new Error("Method not implemented.")
    }
    getDeliveryShippingLabelsPage(params: { page: number, pageSize?: number, orderId?: number, orderState?: any, hubScanned?: boolean, startDate?: Date, endDate?: Date, pickupStartDate?: Date, pickupEndDate?: Date, }): Promise<any[]> {
        throw new Error("Method not implemented.")
    }
    getDeliveryShippingLabel(shipmentId: number): Promise<any> {
        throw new Error("Method not implemented.")
    }
    getReturnShippingLabelsAll(params: { pageSize?: number, orderId?: number, orderState?: any, hubScanned?: boolean, startDate?: Date, }): Promise<any[]> {
        throw new Error("Method not implemented.")
    }
    getReturnShippingLabelsRange(params: { startPage: number, endPage?: number, pageSize?: number, orderId?: number, orderState?: any, hubScanned?: boolean, startDate?: Date, endDate?: Date, }): Promise<any[]> {
        throw new Error("Method not implemented.")
    }
    getReturnShippingLabelsPage(params: { page: number, pageSize?: number, orderId?: number, orderState?: any, hubScanned?: boolean, startDate?: Date, endDate?: Date, }): Promise<any[]> {
        throw new Error("Method not implemented.")
    }
    getReturnShippingLabel(shipmentId: number): Promise<any> {
        throw new Error("Method not implemented.")
    }

}