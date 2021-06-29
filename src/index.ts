import { BackMarketAPI } from "./api";

export default BackMarketAPI

export enum CountryCode {
    France = 'fr-fr',
    Spain = 'es-es',
    Germany = 'de-de',
    Austria = 'de-at',
    Italy = 'it-it',
    UnitedKingdom = 'en-gb',
    Netherlands = 'nl-nl',
    UnitedStates = 'en-us'
}

export enum ErrorCode {
    badRequest = 400,
    unauthorized = 401,
    forbidden = 403,
    notFound = 404,
    tooManyCalls = 429
}

export interface BuyboxPage {
    pageNumber: number
    pageCount: number
    nextPage?: number
    prevPage?: number
    results: BuyboxListing[]
}

export interface BuyboxListing {
    productID: number
    sku: string,
    quantity: number
    price: number
    hasBuyBox: boolean
    priceForBuybox: number
    currency: string
    condition: number
}

import { CatalogFields } from "./interal-types";

export {
    CatalogFields
}