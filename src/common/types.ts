


export enum Language {
    France = 'fr-fr',
    Spain = 'es-es',
    Germany = 'de-de',
    Austria = 'de-at',
    Italy = 'it-it',
    UnitedKingdom = 'en-gb',
    Netherlands = 'nl-nl',
    UnitedStates = 'en-us'
}


export interface BuyBoxPage {
    count: number
    next?: string
    previous?: string
    results: BuyBoxListing[]
}

export interface BuyBoxListing {
    product: number
    sku: string,
    quantity: number
    price: string
    buybox: boolean
    price_for_buybox: number
    currency: string
    condition: number
}

export interface CatalogFields {
    sku: string,
    price: number
}