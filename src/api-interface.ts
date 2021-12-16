import { BuyBoxData, Category, Order, OrderLineUpdateData } from "./types";

export interface BackMarketAPIInterface {

    getCategoryTree(): Promise<Category[]>

    // getCategoryBranch(categoryId: number): Promise<Category>

    // getListingsRange(params: { startPage: number, endPage?: number, publicationState?: number, minQuantity?: number, maxQuantity?: number, }): Promise<{ count: number, results: Listing[]>

    // getListings(params: { page: number, publicationState?: number, minQuantity?: number, maxQuantity?: number, }): Promise<{ count: number, results: Listing[] }>

    getBuyBoxDataRange(startPage: number, endPage?: number): Promise<{ count: number, results: BuyBoxData[] }>

    getBuyBoxData(page: number): Promise<{ count: number, results: BuyBoxData[] }>

    // getListingById(listingId: number): Promise<Listing>

    // getListingBySku(sku: string): Promise<Listing>

    // getOrdersRange(params: { page: number, creationDate?: Date, paymentDate?: Date, modificationDate?: Date, countryCode?: any, state?: any, pageSize?: number, }): Promise<{ count: number, results: Order[] }>

    // getOrders(params: { startPage: number, endPage?: number, creationDate?: Date, paymentDate?: Date, modificationDate?: Date, countryCode?: any, state?: any, pageSize?: number, }): Promise<{ count: number, results: Order[] }>

    getOrder(orderId: number): Promise<Order>

    // getBatch(batchID: number): Promise<any>

    // getRepairReturnsRange(startPage: number, endPage?: number): Promise<{ count: number, results: any[] }>

    // getRepairReturns(page: number): Promise<{ count: number, results: any[] }>

    // createListings(data: ListingCreationData[]): Promise<void>

    // updateListing(listingId: number, data: ListingUpdateData): Promise<void>

    // updateListingsBatch(data: ListingUpdateData[]): Promise<void>

    // updateOrder(orderId: number, data: OrderUpdateData): Promise<void>

    updateOrderLine(orderLineId: number, data: OrderLineUpdateData): Promise<void>

    // getDeliveryShippingLabelsRange(params: { startPage: number, endPage?: number, pageSize?: number, orderId?: number, orderState?: any, hubScanned?: boolean, startDate?: Date, endDate?: Date, pickupStartDate?: Date, pickupEndDate?: Date, }): Promise<{ count: number, results: any[] }>

    // getDeliveryShippingLabels(params: { page: number, pageSize?: number, orderId?: number, orderState?: any, hubScanned?: boolean, startDate?: Date, endDate?: Date, pickupStartDate?: Date, pickupEndDate?: Date, }): Promise<{ count: number, results: any[] }>

    // getDeliveryShippingLabel(shipmentId: number): Promise<any>

    // getReturnShippingLabelsRange(params: { startPage: number, endPage?: number, pageSize?: number, orderId?: number, orderState?: any, hubScanned?: boolean, startDate?: Date, endDate?: Date, }): Promise<{ count: number, results: any[] }>

    // getReturnShippingLabels(params: { page: number, pageSize?: number, orderId?: number, orderState?: any, hubScanned?: boolean, startDate?: Date, endDate?: Date, }): Promise<{ count: number, results: any[] }>

    // getReturnShippingLabel(shipmentId: number): Promise<any>
}