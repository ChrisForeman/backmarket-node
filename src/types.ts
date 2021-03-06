import { CountryCode } from "."
import { Gender, OrderLineState, OrderState, PaymentMethod } from "./enums"

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
    id: number
    shippingAddress: Address
    billingAddress: Address
    deliveryNoteUrl: string
    trackingNumber: string
    trackingUrl: string
    shipperDisplay: string
    dateCreated: Date
    dateModified?: Date
    dateShipped?: Date
    datePaid?: Date
    state: OrderState,
    total: number
    shippingTotal: number
    currency: string
    country: CountryCode,
    paypalRef?: string
    installmentPayment: boolean
    paymentMethod: PaymentMethod
    salesTax: number
    orderLines: OrderLine[]
}

export interface OrderLine {
    id: number
    dateCreated: Date
    state: OrderLineState,
    price: number
    shippingPrice: number
    shippingDelay: number
    currency: string
    returnReason?: string
    returnMessage?: string
    sku: string
    listingId: number
    productTitle: string
    quantity: number
    brand: string
    productId: number
    hasBackCare: boolean
    backCarePrice: number
    salesTax: number
    imei?: string
    serialNumber?: string
}



export interface Address {
    company?: string
    firstName: string
    lastName: string
    gender: Gender
    street: string
    street2?: string
    postalCode: string
    country: CountryCode
    city: string
    phone: string
    email?: string
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
    productId: number
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