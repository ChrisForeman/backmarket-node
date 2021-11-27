
export interface BackMarketAPIInterface {

    getCategoryTree(): Promise<Category[]>

    getCategoryBranch(categoryId: string): Promise<Category>

    getListingsAll(params: { publicationState?: number, minQuantity?: number, maxQuantity?: number }): Promise<Listing[]>

    getListingsRange(params: { startPage: number, endPage?: number, publicationState?: number, minQuantity?: number, maxQuantity?: number }): Promise<Listing[]>

    getListingsPage(params: { page: number, publicationState?: number, minQuantity?: number, maxQuantity?: number }): Promise<Listing[]>

    getBuyBoxDataAll(): Promise<BuyBoxData[]>

    getBuyBoxDataRange(startPage: number, endPage?: number): Promise<BuyBoxData[]>

    getBuyBoxDataPage(page: number): Promise<BuyBoxData[]>

    getListingById(listingId: number): Promise<Listing>

    getListingBySku(sku: string): Promise<Listing>

    getOrdersAll(params: { creationDate?: Date, paymentDate?: Date, modificationDate?: Date, countryCode?: CountryCode, state?: OrderState, pageSize?: number }): Promise<Order>

    getOrdersRange(params: { page: number, creationDate?: Date, paymentDate?: Date, modificationDate?: Date, countryCode?: CountryCode, state?: OrderState, pageSize?: number }): Promise<Order>

    getOrdersPage(params: { startPage: number, endPage?: number, creationDate?: Date, paymentDate?: Date, modificationDate?: Date, countryCode?: CountryCode, state?: OrderState, pageSize?: number }): Promise<Order>

    getOrder(orderId: number): Promise<Order>

    getBatch(batchID: number): Promise<Batch>

    getRepairReturnsAll(): Promise<RepairReturn[]>

    getRepairReturnsRange(startPage: number, endPage?: number): Promise<RepairReturn[]>

    getRepairReturnsPage(page: number): Promise<RepairReturn[]>

    //X - Create Products

    createListings(data: ListingCreationData[]): Promise<void>

    updateListing(listingId: number, data: ListingUpdateData): Promise<void>

    updateListingsBatch(data: ListingUpdateData[]): Promise<void>

    updateOrder(orderId: number, data: OrderUpdateData): Promise<void>

    updateOrderLine(orderLineId: number, data: OrderLineUpdateData): Promise<void>

    //X - Update Clients' invoices

    getDeliveryShippingLabelsAll(params: { pageSize?: number, orderId?: number, orderState?: OrderState, hubScanned?: boolean, startDate?: Date, endDate?: Date, pickupStartDate?: Date, pickupEndDate?: Date }): Promise<DeliveryLabel[]>

    getDeliveryShippingLabelsRange(params: { startPage: number, endPage?: number, pageSize?: number, orderId?: number, orderState?: OrderState, hubScanned?: boolean, startDate?: Date, endDate?: Date, pickupStartDate?: Date, pickupEndDate?: Date }): Promise<DeliveryLabel[]>

    getDeliveryShippingLabelsPage(params: { page: number, pageSize?: number, orderId?: number, orderState?: OrderState, hubScanned?: boolean, startDate?: Date, endDate?: Date, pickupStartDate?: Date, pickupEndDate?: Date }): Promise<DeliveryLabel[]>

    getDeliveryShippingLabel(shipmentId: number): Promise<DeliveryLabel>


    getReturnShippingLabelsAll(params: { pageSize?: number, orderId?: number, orderState?: OrderState, hubScanned?: boolean, startDate?: Date }): Promise<ReturnLabel[]>

    getReturnShippingLabelsRange(params: { startPage: number, endPage?: number, pageSize?: number, orderId?: number, orderState?: OrderState, hubScanned?: boolean, startDate?: Date, endDate?: Date }): Promise<ReturnLabel[]>

    getReturnShippingLabelsPage(params: { page: number, pageSize?: number, orderId?: number, orderState?: OrderState, hubScanned?: boolean, startDate?: Date, endDate?: Date }): Promise<ReturnLabel[]>

    getReturnShippingLabel(shipmentId: number): Promise<ReturnLabel>
}