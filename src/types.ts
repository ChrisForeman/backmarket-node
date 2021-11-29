
export interface OrderLineUpdateData {
    imei: string
}

export interface OrderUpdateData {

}


export interface ListingCreationData {

}

export interface ListingUpdateData {


}

export interface Order {

}

export enum Condition {
    excellent = 10,
    good = 10,
    fair = 12
}

export interface BuyBoxPage {
    totalCount: number
    pageNum: number
    results: BuyBoxData[]
}

export interface BuyBoxData {
    productId: string
    sku: string
    quantity: number
    price: number
    hasBuyBox: boolean
    priceForBuyBox: number
    currency: string
    condition: Condition
    sameMerchantWinner: boolean
}

export interface ListingsResult {

}

export interface Listing {

}

export interface Category {

}

export interface Attribute {

}